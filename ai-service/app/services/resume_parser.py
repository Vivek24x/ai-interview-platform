import fitz # PyMuPDF
import io
import logging

logger = logging.getLogger(__name__)

class ResumeParser:
    @staticmethod
    def extract_text_from_pdf(file_bytes: bytes) -> str:
        """
        Extract clean text from PDF using PyMuPDF (fitz)
        """
        text_content = []
        try:
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            for page in doc:
                text_content.append(page.get_text("text"))
            return "\n".join(text_content).strip()
        except Exception as e:
            logger.error(f"Error parsing PDF: {e}")
            raise ValueError(f"Could not parse PDF file: {str(e)}")
