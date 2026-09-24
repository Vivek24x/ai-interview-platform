# REST API Specification & Endpoint Directory

All endpoints are prefixed with `/api/v1`.

## 1. Authentication & Identity (`/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Register new student or candidate account |
| `POST` | `/auth/login` | Public | Authenticate credentials; returns access token & sets HTTP-only refresh cookie |
| `POST` | `/auth/refresh-token` | Public | Rotates expired access token using valid refresh token |
| `POST` | `/auth/forgot-password`| Public | Initiates password reset flow with OTP email |
| `POST` | `/auth/reset-password` | Public | Verifies OTP and updates account password |
| `POST` | `/auth/logout` | Authenticated | Invalidates session and blacklists token in Redis |

---

## 2. Coding Problem Library & Execution (`/coding`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/coding/problems` | Authenticated | List algorithm problems with difficulty & tag filters |
| `GET` | `/coding/problems/{id}` | Authenticated | Fetch problem description, starter code, and sample testcases |
| `POST` | `/coding/run` | Authenticated | Run code against public test cases (dry run) |
| `POST` | `/coding/submit` | Authenticated | Full submission evaluated against hidden test cases in sandbox |
| `GET` | `/coding/submissions/my`| Authenticated | Candidate's submission history and verdict logs |

---

## 3. AI Mock Interviews (`/interviews`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/interviews/start` | Authenticated | Initialize an AI mock interview session with chosen parameters |
| `POST` | `/interviews/{id}/reply`| Authenticated | Candidate sends answer; evaluates turn & returns next question |
| `POST` | `/interviews/{id}/end` | Authenticated | Concludes interview; compiles overall scorecard and rubrics |
| `GET` | `/interviews/my-history`| Authenticated | Historical list of interviews with scorecards |
| `GET` | `/interviews/{id}/report`| Authenticated| Detailed analysis breakdown for an interview session |

---

## 4. AI Resume Reviewer (`/resumes`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/resumes/analyze` | Authenticated | Upload PDF resume, extract text, and receive ATS scorecard |
| `GET` | `/resumes/my-history` | Authenticated | View previously analyzed resumes and improvement benchmarks |
| `GET` | `/resumes/{id}/pdf` | Authenticated | Download ATS review report as PDF |

---

## 5. Quizzes & Practice (`/quizzes` & `/practice`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/practice/categories` | Authenticated | List all aptitude and CS theory topic modules |
| `GET` | `/practice/topics/{id}/drills` | Authenticated | Fetch practice questions with instant solution explanations |
| `POST` | `/quizzes/start` | Authenticated | Launch timed quiz session |
| `POST` | `/quizzes/{id}/submit` | Authenticated | Submit answers; returns score, accuracy & topic strengths |

---

## 6. Leaderboard & Analytics (`/leaderboard` & `/analytics`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/leaderboard/global` | Authenticated | Fetch top students ranked by XP via Redis ZREVRANGE |
| `GET` | `/leaderboard/weekly` | Authenticated | Weekly reset rankings |
| `GET` | `/leaderboard/college` | Authenticated | College/university-specific leaderboards |
| `GET` | `/analytics/student-summary` | Authenticated | Aggregate statistics (accuracy, streak, radar chart metrics) |

---

## 7. Certificates (`/certificates`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/certificates/my` | Authenticated | List earned certificates |
| `GET` | `/certificates/verify/{certNumber}` | Public | Public cryptographic verification page |

---

## 8. Administration (`/admin`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/metrics` | `ROLE_ADMIN` | Platform telemetry, total students, system health |
| `POST`| `/admin/problems` | `ROLE_ADMIN` | Create or update coding algorithm problems & test suites |
| `POST`| `/admin/quizzes` | `ROLE_ADMIN` | Create assessment quiz packages |
| `GET` | `/admin/users` | `ROLE_ADMIN` | Paginated user management table with search and disable actions |
