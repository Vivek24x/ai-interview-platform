# Feasibility Analysis, Feature Prioritization & Phased Roadmap

## 1. Feature Feasibility Matrix

| Feature | Primary Tech | Complexity | Dependencies | Key Risks & Gotchas | Recommended Architecture |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Interactive AI Mock Interviews** | FastAPI + Gemini 1.5 Flash + Web Speech API | Medium-High | Gemini API, Prompt templates | High turn latency breaks immersion; hallucinations | Use **Gemini 1.5 Flash** for turn-by-turn interactions (<1s) and client-side Web Speech API. |
| **Real-time Voice / WebRTC** | WebRTC / Gemini Live API | Very High | Media servers (LiveKit), WebRTC signaling | Bandwidth, media server costs, latency degradation | **Defer to V2**. Start with browser Web Speech synthesis/recognition in MVP. |
| **Video Emotion & Eye-Tracking** | OpenCV / MediaPipe | Very High | Client GPU/WASM, webcam permissions | High false positives, student privacy backlash | **Optional / Future**. Low pedagogical ROI for initial launch. |
| **Online Code Execution** | Judge0 / Docker runner | High | Sandbox kernel, memory/CPU cgroups | Security exploits, fork bombs, server resource starvation | Never execute on main backend. Delegate to isolated Judge0 sandbox with zero-network & strict ulimits. |
| **ATS Resume Review** | PyMuPDF + Gemini 1.5 Pro | Medium | PyMuPDF, Pydantic | Multi-column PDF parsing failures | Extract plain text with PyMuPDF; fallback to pdfplumber for tables. Output strictly typed JSON. |
| **Dynamic Leaderboard** | Redis Sorted Sets (ZSET) | Low-Medium | Redis 7.2 | High database writes on every completed quiz/problem | Store leaderboard in Redis `ZINCRBY`. Read with `ZREVRANGE`. Sync to MongoDB asynchronously. |
| **Verifiable Certificates** | Java 21 + PDFBox + SHA-256 | Low-Medium | Font metrics, QR generator | Public spoofing | Generate unique SHA-256 hash and embed QR code pointing to public verification endpoint. |
| **Notifications** | SSE (Server-Sent Events) + Nodemailer/SES | Low-Medium | Email provider | Spammed inboxes | Implement user preference matrix for email vs in-app alerts. |

---

## 2. Feature Prioritization (MVP vs. V2 vs. Future)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ MVP (Phase 1 — Launch Essentials)                                           │
│  - Authentication with JWT, Refresh Tokens & RBAC (Student & Admin)         │
│  - Student Dashboard with Streak, XP, Activity, & Daily Goals               │
│  - Aptitude & Core CS Question Banks with Explanations                      │
│  - Monaco Code Editor with Isolated Code Execution (Java, Python)           │
│  - Conversational AI Mock Interview (Text + Voice synthesis) via Gemini     │
│  - AI ATS Resume Scanner (PDF upload, ATS Score, Impact Bullet Optimizer)   │
│  - Timed Assessments & Quizzes with detailed analytics                     │
│  - Redis-powered National & College Leaderboard                             │
│  - Basic Admin Management Console (Users, Problems, MCQs)                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Version 2 (Post-Launch Enhancements)                                        │
│  - Full Real-Time Bidirectional Audio Mock Interviews (Gemini Live API)     │
│  - Cryptographically signed PDF Certificates with Public Verification Link  │
│  - Personalized AI Curriculum Roadmap Generator based on Weak Topics        │
│  - Interactive Peer Coding Contests & Timed Hackathons                      │
│  - Custom University Placement Cell Admin Sub-Tenancy                       │
│  - Rich Interview Experiences & Campus Placement Articles Repository        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Future / Enterprise Vision                                                  │
│  - Video posture, pacing, and eye-contact feedback via client-side WASM     │
│  - Automated Campus Drive Hiring Portals for Enterprise Recruiters          │
│  - Multi-language code translation & explanation copilot                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phased Development Roadmap

### Phase 1: Architecture & Scaffolding (Completed ✅)
- Establish monorepo/polyrepo structure (`frontend/`, `backend/`, `ai-service/`, `database/`).
- Configure Docker Compose orchestrator for local development.
- Scaffold database initializers, MongoDB compound indexes, and seed fixtures.

### Phase 2: Design System & Frontend Foundations
- Configure Tailwind CSS theme (SaaS purple/indigo palette, soft cards, subtle shadows).
- Implement responsive layout hierarchy (`Header`, `Sidebar`, `StudentLayout`, `AdminLayout`).
- Establish global state store (Zustand) and API interceptors (Axios with refresh token rotation).

### Phase 3: Core Identity & Security
- Spring Security 6 stateless JWT filter chain with BCrypt password hashing.
- Role-based authorization (`ROLE_STUDENT`, `ROLE_ADMIN`).
- Registration, Login, Forgot Password, and Profile settings views.

### Phase 4: Aptitude & Technical Practice Engine
- Question bank schema for Quantitative, Logical, Verbal, and Core CS (DBMS, OS, OOP, Networks).
- Practice question viewer with instant feedback and step-by-step explanations.
- Student topic accuracy tracker.

### Phase 5: Sandboxed Coding Arena
- Integrate Monaco Editor with multi-language support (Java, Python, C++, JS).
- Problem details viewer (Description, Examples, Constraints, Hints).
- Integrate isolated code execution pipeline (Judge0 client) with execution verdict drawers.

### Phase 6: AI Intelligence Services
- FastAPI microservice setup with Google Gemini 1.5 SDK.
- PDF text extraction pipeline using PyMuPDF and pdfplumber.
- ATS Resume Reviewer: ATS score calculation, missing keyword identification, bullet enhancer.
- AI Mock Interview Engine: Turn-by-turn evaluator with instant rubric scoring.

### Phase 7: Timed Quizzes & Assessment Engine
- Timed test simulator with question palette navigation and mark-for-review state.
- Automated score calculation, negative marking support, and topic-wise breakdown.

### Phase 8: Gamification, Leaderboards & Analytics
- Redis Sorted Sets implementation for real-time national, college, and weekly rankings.
- Student analytics dashboard with Recharts (accuracy radar, score progression, streak maintenance).
- Certificate generation with unique verification hashes.

### Phase 9: Admin Management & Auditing
- Admin management consoles for coding problems, quizzes, and user bans.
- Platform telemetry metrics and API health monitoring.

### Phase 10: Production Hardening & Cloud Deployment
- Deploy Frontend on Vercel with edge routing.
- Deploy Spring Boot backend and FastAPI microservice on Render / Railway / AWS ECS.
- Configure MongoDB Atlas cluster and Redis Cloud instance.
