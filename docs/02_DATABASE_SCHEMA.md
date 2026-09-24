# Database Architecture & MongoDB Data Models

## 1. Design Philosophy: Embedded vs. Referenced Documents

| Use Case | Strategy | Rationale |
| :--- | :--- | :--- |
| **Interview Transcripts** | **Embedded** in `mock_interviews` | Conversation messages are always read and displayed together with the session. High read locality; atomic updates. |
| **Problem Test Cases** | **Embedded** in `coding_problems` | Test cases are tightly coupled to the problem definition and bounded in count (&lt;50 test cases per problem). |
| **Student Submissions** | **Referenced** in `submissions` | Submissions grow unbounded per student and per problem over time. Referencing prevents hitting MongoDB's 16MB document cap. |
| **Quiz Questions** | **Referenced / Hybrid** | Questions belong to an assessment pool and can be dynamically selected across multiple quizzes. |
| **User Activity Log** | **Referenced** in `activity_logs` | High write frequency; decoupled from core `users` document to prevent lock contention. |

---

## 2. Collections & Schemas

### `users`
```json
{
  "_id": ObjectId("..."),
  "email": "student@university.edu",
  "password": "$2a$10$...",
  "fullName": "Vivek Pal",
  "avatarUrl": "https://res.cloudinary.com/...",
  "college": "State Tech University",
  "branch": "Computer Science & Engineering",
  "graduationYear": 2026,
  "targetRole": "Full-Stack SDE",
  "roles": ["ROLE_STUDENT"],
  "streakDays": 5,
  "lastActiveDate": ISODate("2026-09-24T00:00:00Z"),
  "totalPoints": 1420,
  "problemsSolved": 48,
  "emailVerified": true,
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```
**Indexes**:
- `{ "email": 1 }` (Unique)
- `{ "totalPoints": -1 }` (Leaderboard aggregation)
- `{ "streakDays": -1 }`

---

### `coding_problems`
```json
{
  "_id": ObjectId("..."),
  "title": "Two Sum",
  "slug": "two-sum",
  "difficulty": "EASY",
  "tags": ["Array", "Hash Table"],
  "companies": ["Google", "Amazon", "Microsoft"],
  "description": "Given an array of integers nums and an integer target...",
  "constraints": ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
  "hints": ["Try using a hash map for O(n) lookup."],
  "starterCode": {
    "java": "class Solution { public int[] twoSum(...) {} }",
    "python": "class Solution: def twoSum(...) -> List[int]:"
  },
  "testCases": [
    { "input": "[2,7,11,15]\n9", "expectedOutput": "[0,1]", "isPublic": true }
  ],
  "totalSubmissions": 1420,
  "acceptedSubmissions": 1180
}
```
**Indexes**:
- `{ "slug": 1 }` (Unique)
- `{ "difficulty": 1, "tags": 1 }` (Compound index for filtering)
- `{ "title": "text", "description": "text" }` (Full-text search)

---

### `mock_interviews`
```json
{
  "_id": ObjectId("..."),
  "userId": "66f2a...",
  "interviewType": "TECHNICAL",
  "targetRole": "Full-Stack SDE",
  "targetCompany": "Google",
  "status": "COMPLETED",
  "transcript": [
    {
      "sender": "AI_INTERVIEWER",
      "content": "Explain optimistic vs pessimistic locking.",
      "timestamp": ISODate("..."),
      "clarityScore": null,
      "technicalDepthScore": null
    },
    {
      "sender": "CANDIDATE",
      "content": "Optimistic locking assumes conflicts are rare and verifies version tags...",
      "timestamp": ISODate("..."),
      "clarityScore": 92,
      "technicalDepthScore": 88,
      "quickCoachingTip": "Great explanation of @Version in JPA."
    }
  ],
  "overallScore": 88,
  "technicalAccuracyScore": 89,
  "communicationScore": 85,
  "keyStrengths": ["Concurrency control", "Clarity in trade-offs"],
  "improvementAreas": ["Deepen understanding of distributed consensus"],
  "detailedSummary": "Candidate displayed strong backend maturity...",
  "createdAt": ISODate("...")
}
```
**Indexes**:
- `{ "userId": 1, "createdAt": -1 }` (User history queries)
- `{ "status": 1 }`

---

### `resume_reviews`
```json
{
  "_id": ObjectId("..."),
  "userId": "66f2a...",
  "resumeFileName": "resume.pdf",
  "atsScore": 84,
  "skillsExtracted": ["Java", "Spring Boot", "React", "MongoDB"],
  "missingRecommendedSkills": ["Redis", "Kubernetes", "Kafka"],
  "sectionScores": {
    "contactInfo": 100,
    "skills": 88,
    "experience": 80,
    "projects": 85,
    "education": 90,
    "formatting": 95
  },
  "bulletImprovements": [
    {
      "original": "Built backend APIs.",
      "optimized": "Architected RESTful microservices in Spring Boot 3 serving 10k users.",
      "rationale": "Incorporates quantified scale and modern framework spec."
    }
  ],
  "createdAt": ISODate("...")
}
```
**Indexes**:
- `{ "userId": 1, "createdAt": -1 }`
