from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.routes_resume import router as resume_router
from app.api.v1.routes_interview import router as interview_router
from app.api.v1.routes_quiz_gen import router as quiz_gen_router
from app.api.v1.routes_recommendations import router as recommendations_router
import uvicorn

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI Intelligence microservice handling Gemini 1.5 prompting, ATS resume parsing, and mock interview evaluation."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root health check
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT
    }

# Mount API Routers
app.include_router(resume_router, prefix="/api/v1")
app.include_router(interview_router, prefix="/api/v1")
app.include_router(quiz_gen_router, prefix="/api/v1")
app.include_router(recommendations_router, prefix="/api/v1")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)
