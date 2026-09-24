from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class BulletOptimization(BaseModel):
    original: str
    optimized: str
    rationale: str

class SectionScores(BaseModel):
    contactInfo: int = Field(ge=0, le=100)
    summary: int = Field(ge=0, le=100)
    experience: int = Field(ge=0, le=100)
    projects: int = Field(ge=0, le=100)
    education: int = Field(ge=0, le=100)
    formatting: int = Field(ge=0, le=100)

class ResumeAnalysisResponse(BaseModel):
    atsScore: int = Field(ge=0, le=100)
    detectedRole: str
    skillsExtracted: List[str]
    missingRecommendedSkills: List[str]
    sectionScores: SectionScores
    strengths: List[str]
    criticalGaps: List[str]
    actionableSuggestions: List[str]
    bulletOptimizations: List[BulletOptimization]
