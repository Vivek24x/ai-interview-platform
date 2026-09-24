import json
import logging
import google.generativeai as genai
from app.core.config import settings
from app.schemas.resume import ResumeAnalysisResponse
from app.schemas.interview import InterviewTurnResponse

logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self):
        if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "placeholder_key":
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
            self.flash_model = genai.GenerativeModel(settings.GEMINI_FLASH_MODEL)
        else:
            self.model = None
            self.flash_model = None

    async def analyze_resume_text(self, resume_text: str, target_role: str) -> dict:
        """
        Send extracted resume text to Gemini to perform comprehensive ATS grading and bullet improvement.
        """
        if not self.model:
            # High-fidelity mock response for local testing/development when no key is set
            return {
                "atsScore": 86,
                "detectedRole": target_role or "Full-Stack Software Engineer",
                "skillsExtracted": ["Java", "Spring Boot", "React", "MongoDB", "REST APIs", "Docker", "Git"],
                "missingRecommendedSkills": ["Redis", "Kubernetes", "Microservices Architecture", "Kafka"],
                "sectionScores": {
                    "contactInfo": 100,
                    "summary": 85,
                    "experience": 82,
                    "projects": 88,
                    "education": 90,
                    "formatting": 94
                },
                "strengths": [
                    "Strong full-stack stack coverage with modern Java & React",
                    "Clean structural layout with clear section demarcations"
                ],
                "criticalGaps": [
                    "Lack of quantified production impact metrics in experience bullets",
                    "Missing cloud containerization and caching orchestration keywords"
                ],
                "actionableSuggestions": [
                    "Quantify latency and scale (e.g. 'reduced latency by 30%', 'served 5k DAU')",
                    "Add a dedicated Skills Matrix categorized by Languages, Frameworks, and Tools"
                ],
                "bulletOptimizations": [
                    {
                        "original": "Built REST APIs for user authentication.",
                        "optimized": "Architected secure RESTful auth service in Spring Boot 3 utilizing JWT with refresh token rotation, reducing token validation overhead by 40%.",
                        "rationale": "Uses XYZ format (Accomplished [X], as measured by [Y], by doing [Z])."
                    }
                ]
            }

        prompt = f"""
        You are an elite Tech Recruiter and ATS Optimization Specialist.
        Analyze this resume for the role: {target_role}.
        Resume content:
        {resume_text}

        Return strict JSON adhering to:
        - atsScore (0-100)
        - detectedRole
        - skillsExtracted (list)
        - missingRecommendedSkills (list)
        - sectionScores (contactInfo, summary, experience, projects, education, formatting all 0-100)
        - strengths (list)
        - criticalGaps (list)
        - actionableSuggestions (list)
        - bulletOptimizations (list of {{original, optimized, rationale}})
        """
        response = self.model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        return json.loads(response.text)

    async def evaluate_interview_response(self, question: str, candidate_answer: str, role: str) -> dict:
        """
        Evaluate candidate's answer and produce the next contextual follow-up question.
        """
        if not self.model:
            return {
                "nextQuestion": "Great analysis of concurrency control. How would you design a rate limiter in Spring Boot for public API endpoints?",
                "instantFeedback": {
                    "clarityScore": 88,
                    "technicalDepthScore": 84,
                    "relevanceScore": 92,
                    "coachingTip": "Excellent technical accuracy. Keep responses structured using problem-solution-tradeoff format."
                },
                "isInterviewComplete": False
            }

        prompt = f"""
        Role: {role}
        Question asked: {question}
        Candidate's answer: {candidate_answer}

        Evaluate the answer and provide:
        1. nextQuestion (contextual follow-up)
        2. instantFeedback: clarityScore (0-100), technicalDepthScore (0-100), relevanceScore (0-100), coachingTip
        3. isInterviewComplete (boolean)

        Return JSON format only.
        """
        response = self.flash_model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        return json.loads(response.text)

gemini_service = GeminiService()
