#!/bin/bash
# ==============================================================================
# AI Interview Preparation Platform — Local Development Bootstrap Script
# ==============================================================================

set -e

echo "=========================================================="
echo "🚀 Starting AI Interview Preparation Platform..."
echo "=========================================================="

# Check if Docker is running
if command -v docker >/dev/null 2>&1; then
    echo "📦 Starting MongoDB and Redis via Docker Compose..."
    docker-compose up -d mongodb redis
    echo "✅ Databases running on ports 27017 (Mongo) and 6379 (Redis)"
else
    echo "⚠️  Docker not found. Ensure MongoDB and Redis are running locally."
fi

# Print Instructions
echo ""
echo "----------------------------------------------------------"
echo "To run the individual services:"
echo "----------------------------------------------------------"
echo "1. AI Microservice (FastAPI):"
echo "   cd ai-service"
echo "   source venv/bin/activate || python3 -m venv venv && source venv/bin/activate"
echo "   pip install -r requirements.txt"
echo "   uvicorn main:app --reload --port 8000"
echo ""
echo "2. Core REST Backend (Spring Boot 3.3 / Java 21):"
echo "   cd backend"
echo "   ./mvnw spring-boot:run"
echo ""
echo "3. Frontend SPA (React + Vite):"
echo "   cd frontend"
echo "   npm install"
echo "   npm run dev"
echo "----------------------------------------------------------"
echo "✨ System ready for active pair-programming & feature development!"
