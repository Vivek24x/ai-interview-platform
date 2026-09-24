from pydantic import BaseModel, Field
from typing import List, Optional

class InterviewTurnRequest(BaseModel):
    sessionId: str
    targetRole: str = "Software Engineer"
    interviewType: str = "TECHNICAL" # TECHNICAL, HR, BEHAVIORAL, SYSTEM_DESIGN
    questionContext: str
    candidateResponse: str

class InstantFeedback(BaseModel):
    clarityScore: int = Field(ge=0, le=100)
    technicalDepthScore: int = Field(ge=0, le=100)
    relevanceScore: int = Field(ge=0, le=100)
    coachingTip: str

class InterviewTurnResponse(BaseModel):
    nextQuestion: str
    instantFeedback: InstantFeedback
    isInterviewComplete: bool = False
