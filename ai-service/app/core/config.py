from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "PrepAI Intelligence Service"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    PORT: int = 8000
    
    # AI Credentials
    GEMINI_API_KEY: str = "placeholder_key"
    GEMINI_MODEL: str = "gemini-1.5-pro"
    GEMINI_FLASH_MODEL: str = "gemini-1.5-flash"
    
    # Service-to-service internal auth
    INTERNAL_API_SECRET: str = "prep_ai_internal_token_987"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
