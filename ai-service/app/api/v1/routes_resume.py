from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.resume_parser import ResumeParser
from app.services.gemini_service import gemini_service
import logging

router = APIRouter(prefix="/resume", tags=["AI Resume"])
logger = logging.getLogger(__name__)

@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    target_role: str = Form("Software Engineer")
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF format is supported currently.")

    try:
        content = await file.read()
        extracted_text = ResumeParser.extract_text_from_pdf(content)
        analysis_result = await gemini_service.analyze_resume_text(extracted_text, target_role)
        return {"success": True, "data": analysis_result}
    except Exception as e:
        logger.error(f"Resume analysis failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
