# AI Pipeline & Intelligence Architecture

## 1. Multi-Model Strategy (Gemini 1.5 Flash vs. Pro)

To balance **latency**, **cost**, and **reasoning depth**, the platform employs a dual-model routing strategy:

```
                          Incoming Request
                                 │
                 ┌───────────────┴───────────────┐
                 │                               │
        Turn-by-Turn Latency            Deep Reasoning / Large Context
        - Interactive Interview Turn    - Comprehensive Resume Audit
        - Instant Feedback & Tips       - Aggregate Interview Summary
        - Quick Quiz Generation         - Learning Roadmap Generation
                 │                               │
                 ▼                               ▼
      Google Gemini 1.5 Flash         Google Gemini 1.5 Pro
      • Latency: ~600ms - 900ms        • Latency: ~1.8s - 3.2s
      • High throughput               • Deep contextual synthesis
```

---

## 2. Resume Parsing & ATS Scoring Pipeline

```
  [User PDF Upload] 
         │
         ▼
  [Spring Boot Gateway]
         │ (Stream multipart buffer)
         ▼
  [FastAPI Microservice]
         │
         ├─► [PyMuPDF (fitz)]: High-speed page text extraction
         ├─► [pdfplumber]: Table, layout & tabular skill grid extraction
         │
         ▼
  [Sanitization & Chunking]
         │ (Strip non-printable chars, normalize whitespace)
         ▼
  [Gemini 1.5 Pro Engine]
         │ Prompt: ATS Evaluation Matrix + Strict JSON Schema
         ▼
  [Pydantic Validation] (Guarantees typed numeric scores & lists)
         │
         ▼
  [MongoDB Persistence & Radar Visualizer]
```

### JSON Schema Enforcement
By leveraging Google Gemini's native `response_mime_type: "application/json"`, we guarantee 100% parseable structured outputs, eliminating runtime JSON decode failures common with unconstrained LLM outputs.

---

## 3. Turn-by-Turn AI Mock Interview Workflow

```
Candidate Speaks or Types Answer
               │
               ▼
   [Web Speech API / Text Input]
               │
               ▼
      [Spring Boot Gateway]
               │ (Authenticates JWT & decorates with candidate profile)
               ▼
     [FastAPI AI Service]
               │
               ├─► [Session Memory]: Retrieves last 3 conversation turns
               ├─► [Interviewer Persona]: Injects Target Role & Company tone
               │
               ▼
    [Gemini 1.5 Flash Engine]
               │
               ├─► 1. Instant Feedback: Clarity (0-100), Technical Depth (0-100)
               ├─► 2. Coaching Tip: "Highlight time complexity"
               └─► 3. Next Contextual Question: Follow-up or topic transition
               │
               ▼
Candidate UI Updates in Real-time (TTS Voice Audio + Visual Scorecard)
```

---

## 4. Prompt Injection Mitigation & Guardrails

1. **System Prompt Delimiters**: Candidate answers are enclosed in strict XML `<candidate_input>` tags to prevent jailbreaking.
2. **Strict Output Schemas**: All responses are forced through Pydantic models. Any attempt by the candidate to coax system prompts or secret tokens is filtered before reaching the client.
3. **Internal VPC Isolation**: FastAPI endpoints accept an `X-Internal-Secret` header, ensuring only authorized Spring Boot microservices can trigger model invocations.
