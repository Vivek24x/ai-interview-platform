# AI Interview Preparation Platform

> A production-grade, full-stack AI-powered placement and interview preparation ecosystem engineered for students, job-seekers, and university placement cells.

---

## 🏛️ System Overview

The **AI Interview Preparation Platform** is architected as a modular, cloud-native micro-service & service-oriented system:

1. **Frontend (`frontend/`)**: React 18/19 SPA built with Vite, TypeScript, Tailwind CSS, shadcn/ui primitives, Framer Motion, and TanStack Query.
2. **Core Backend (`backend/`)**: Spring Boot 3.3.x (Java 21) handling business domains, authentication/authorization (JWT + RBAC), practice modules, coding submissions, quizzes, certificates, notifications, and analytics.
3. **AI Intelligence Engine (`ai-service/`)**: FastAPI microservice (Python 3.11+) interfacing with Google Gemini 1.5 Pro/Flash, PyMuPDF/pdfplumber for ATS resume parsing, contextual turn-by-turn mock interview evaluation, and adaptive question generation.
4. **Data & Caching Layer (`database/`)**: MongoDB Atlas for flexible, hierarchical domain records (nested transcripts, ATS reviews, dynamic test configurations) + Redis for sub-millisecond leaderboard rankings (ZSET), token blacklisting, and rate limiting.
5. **Execution Sandboxing**: Isolated code runner architecture delegating to Judge0 or sandboxed Docker containers to prevent untrusted code execution on application servers.

---

## 📂 Project Directory Structure

```text
AI-Interview-Preparation-Platform/
├── frontend/                   # Modern React + Vite + TypeScript Client
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── api/                # Axios instance, interceptors, API service modules
│   │   ├── assets/             # SVGs, brand assets, illustration placeholders
│   │   ├── components/         # Atomic UI components, data tables, modals, charts
│   │   │   ├── ui/             # Radix / shadcn/ui primitives (Button, Card, Dialog, etc.)
│   │   │   ├── layout/         # Header, Sidebar, Footer, Breadcrumbs
│   │   │   └── shared/         # EmptyState, ErrorBoundary, StatCard, MarkdownViewer
│   │   ├── features/           # Feature-sliced modules
│   │   │   ├── auth/           # Login, Register, ForgotPassword, OTP Verification
│   │   │   ├── dashboard/      # Student Dashboard, analytics cards, recent activity
│   │   │   ├── practice/       # Aptitude, Technical, DSA topic explorers
│   │   │   ├── coding/         # Monaco Code Editor, testcase runner, submission log
│   │   │   ├── interviews/     # AI Mock Interview cockpit, audio/text chat, scorecard
│   │   │   ├── quiz/           # Timed Quiz engine, question palette, review mode
│   │   │   ├── resume/         # Drag-and-drop resume upload, ATS score, radar breakdown
│   │   │   ├── leaderboard/    # Global, weekly, college rankings, badge showcases
│   │   │   ├── certificates/   # PDF preview, download, verification scanner
│   │   │   ├── profile/        # User portfolio, academic details, skill tags
│   │   │   └── admin/          # Admin panels: Content manager, user table, reports
│   │   ├── hooks/              # Custom React hooks (useAuth, useTimer, useSpeech, etc.)
│   │   ├── layouts/            # PublicLayout, StudentLayout, AdminLayout
│   │   ├── routes/             # React Router v6 setup, ProtectedRoute, RoleGuard
│   │   ├── store/              # Zustand state stores (auth, interview, quiz)
│   │   ├── types/              # Comprehensive TypeScript type definitions
│   │   └── utils/              # Formatters, token handlers, validators
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/                    # Spring Boot 3.3.x (Java 21) REST Core
│   ├── src/main/java/com/prep/ai/
│   │   ├── common/             # Standard ApiResponse<T>, PageResponse, ErrorCodes
│   │   ├── config/             # SecurityConfig, MongoConfig, RedisConfig, OpenAPI, CORS
│   │   ├── security/           # JWT filters, UserPrincipal, AccessDenied handlers
│   │   ├── exception/          # Custom exceptions & @RestControllerAdvice handler
│   │   ├── client/             # WebClient integrations (FastAPI AI service, Cloudinary)
│   │   └── modules/            # Domain-driven modular packages
│   │       ├── auth/           # AuthController, AuthService, UserCredentials
│   │       ├── user/           # StudentProfile, Settings, AcademicHistory
│   │       ├── practice/       # Aptitude & Technical question bank service
│   │       ├── coding/         # Problem management, submission coordinator, Judge0 client
│   │       ├── quiz/           # Quiz session manager, automated grading engine
│   │       ├── interview/      # Mock interview coordinator & assessment aggregator
│   │       ├── resume/         # Resume metadata & review storage
│   │       ├── leaderboard/    # Redis-backed score aggregator & ranking scheduler
│   │       ├── certificate/    # SHA-256 certificate issuing & public verification
│   │       ├── notification/   # Real-time in-app & transactional email triggers
│   │       └── admin/          # Platform telemetry, content curation, user audit
│   ├── src/main/resources/
│   │   ├── application.yml     # Spring profiles, MongoDB URI, JWT secret, AI service endpoint
│   │   └── application-dev.yml
│   └── pom.xml                 # Maven dependencies
│
├── ai-service/                 # FastAPI (Python 3.11+) Microservice
│   ├── app/
│   │   ├── api/v1/             # Endpoints for resume analysis, interviews, question generation
│   │   ├── core/               # App configuration, Gemini client setup, system prompts
│   │   ├── schemas/            # Pydantic validation models (Strict typing for JSON outputs)
│   │   ├── services/           # Gemini AI orchestrator, ATS parser, feedback generator
│   │   └── utils/              # PDF/DOCX extractors, text chunkers, sanitizers
│   ├── tests/                  # Pytest test cases
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
│
├── database/                   # Database schemas, migrations & seeders
│   ├── mongo-init/             # Initial database initialization scripts
│   │   └── 01-init-mongo.js    # Index creation (compound, text search) & admin user seed
│   └── seed/                   # JSON fixtures for coding problems, aptitude, interview rubrics
│       ├── coding_problems.json
│       └── aptitude_questions.json
│
├── docs/                       # Complete architectural specifications
│   ├── 01_SYSTEM_ARCHITECTURE.md
│   ├── 02_DATABASE_SCHEMA.md
│   ├── 03_API_SPECIFICATION.md
│   ├── 04_AI_PIPELINE.md
│   └── 05_FEASIBILITY_AND_ROADMAP.md
│
├── postman/                    # Postman Collection & Environments
│   ├── AI_Interview_Prep_API.postman_collection.json
│   └── Local_Environment.postman_environment.json
│
├── docker-compose.yml          # Unified multi-container developer setup
└── README.md                   # Master Documentation
```

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
- **Docker & Docker Compose** (Recommended for zero-configuration local boot)
- **Node.js 20+** & **npm**
- **Java 21 JDK** & **Maven 3.9+**
- **Python 3.11+**
- **Google Gemini API Key** (from Google AI Studio)

### 2. Environment Setup
Copy the sample environment files and configure your keys:
```bash
# In ai-service/
cp ai-service/.env.example ai-service/.env

# In backend/
# Configure environment variables in backend/src/main/resources/application.yml or export them:
export MONGODB_URI=mongodb://localhost:27017/prep_ai_db
export JWT_SECRET=your_super_secret_512_bit_hex_encoded_key_for_hmac_sha256
export AI_SERVICE_URL=http://localhost:8000
export GEMINI_API_KEY=your_gemini_api_key

# In frontend/
cp frontend/.env.example frontend/.env
```

### 3. Spin up Infrastructure via Docker Compose
```bash
docker-compose up -d mongo redis
```

### 4. Running the Services
- **AI Service (FastAPI)**:
  ```bash
  cd ai-service
  python -m venv venv && source venv/bin/activate
  pip install -r requirements.txt
  uvicorn main:app --reload --port 8000
  ```
- **Backend (Spring Boot)**:
  ```bash
  cd backend
  ./mvnw spring-boot:run
  ```
- **Frontend (React + Vite)**:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

Frontend will be available at `http://localhost:5173`, Backend Swagger UI at `http://localhost:8080/swagger-ui.html`, and FastAPI Docs at `http://localhost:8000/docs`.
