# System Architecture Specification

## 1. High-Level Architecture Overview

The **AI Interview Preparation Platform** is designed as a secure, distributed, microservice-oriented platform engineered to scale to hundreds of thousands of concurrent students, mock interviews, and automated evaluations.

```
                                  ┌───────────────────────────────┐
                                  │      Client Applications      │
                                  │   React 18 SPA + Tailwind     │
                                  └──────────────┬────────────────┘
                                                 │ HTTPS / WSS
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │       Cloudflare CDN / DNS    │
                                  │   (DDoS Protection & SSL)     │
                                  └──────────────┬────────────────┘
                                                 │
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │     Spring Boot 3.3 Gateway   │
                                  │  (JWT Filter, RBAC, Limiter)  │
                                  └──────┬───────────────┬────────┘
                                         │               │
                     Internal HTTP / gRPC│               │ Async Submissions
                                         ▼               ▼
           ┌───────────────────────────────┐   ┌───────────────────────────────┐
           │     FastAPI AI Microservice   │   │   Isolated Code Sandbox       │
           │  (PyMuPDF, Gemini 1.5 Engine) │   │    (Judge0 / Docker Runner)   │
           └──────────────┬────────────────┘   └───────────────────────────────┘
                          │
                          ▼
           ┌───────────────────────────────┐
           │        Google Gemini API      │
           │  (gemini-1.5-pro / flash)     │
           └───────────────────────────────┘

                 Persistent Storage & In-Memory Data Plane
           ┌───────────────────────────────┬───────────────────────────────┐
           │     MongoDB Atlas (v7.0)      │     Redis 7.2 Cluster         │
           │  - Users & Submissions        │  - Leaderboard ZSETs          │
           │  - Mock Transcripts           │  - Token Blacklists           │
           │  - Quizzes & Resumes          │  - Rate Limiting Counters     │
           └───────────────────────────────┴───────────────────────────────┘
```

---

## 2. Core Architectural Decisions

### A. Separation of Concerns: Spring Boot vs FastAPI
- **Spring Boot 3.3 (Java 21)** acts as the **System of Record & Orchestrator**:
  - Handles client authentication, RBAC authorization, and user profile management.
  - Serves as the trusted gateway protecting internal AI and code-execution microservices.
  - Enforces transactions, token rotation, rate limits, audit logging, and certificate hashing.
- **FastAPI (Python 3.11+)** acts as the **Specialized AI & Document Processing Engine**:
  - Leverages Python's native ecosystem for PDF extraction (`PyMuPDF`, `pdfplumber`).
  - Implements asynchronous streaming with Google GenAI SDK (`google-generativeai`).
  - Produces strictly validated JSON structured outputs via Pydantic schemas.
  - Completely decoupled from customer auth; protected via internal VPC security tokens.

### B. MongoDB Document Store Architecture
- Chosen for its natural fit with deeply nested, variable-length hierarchical documents:
  - **Mock Interview Sessions**: Entire conversation turns, audio waveforms, turn-level scores, and summary feedback are encapsulated in single atomic documents.
  - **Quizzes & Tests**: Dynamically composed question structures with variable option counts, code snippets, and explanations.
  - **ATS Resume Audits**: Highly unstructured extracted text, variable-length skill matrices, and section radar scorecards.
- Relational integrity where needed (e.g. user IDs, leaderboard points) is preserved via Spring Data MongoDB references and atomic operations (`$inc`, `$push`, `findAndModify`).

### C. Sandboxed Online Code Execution Architecture
- **Threat Vector**: Arbitrary code execution (e.g. `Runtime.getRuntime().exec()`, `fork bombs`, disk wipes, network socket hijacking).
- **Architecture**:
  - The main Spring Boot backend **never** compiles or executes student code directly.
  - Code submissions are forwarded to **Judge0** (or a dedicated sandboxed execution container worker).
  - Worker runs with:
    - Root filesystem mounted **read-only**.
    - Complete network isolation (`--net=none`).
    - Kernel-enforced memory caps (e.g. `512MB`), CPU quotas (e.g. `2000ms`), and process limits (`ulimit -u 64`).
    - Disposable scratch directories wiped immediately post-run.
