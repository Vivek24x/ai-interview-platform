from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini_service import gemini_service
import logging

router = APIRouter(prefix="/interview", tags=["AI Mock Interview"])
logger = logging.getLogger(__name__)

class EvaluateTurnPayload(BaseModel):
    sessionId: str
    targetRole: str = "Software Engineer"
    currentQuestion: str = "Explain how you optimize database queries."
    candidateResponse: str

@router.post("/evaluate-turn")
async def evaluate_turn(payload: EvaluateTurnPayload):
    try:
        evaluation = await gemini_service.evaluate_interview_response(
            question=payload.currentQuestion,
            candidate_answer=payload.candidateResponse,
            role=payload.targetRole
        )
        return {"success": True, "data": evaluation}
    except Exception as e:
        logger.error(f"Interview evaluation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
