from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.mongodb import connect_to_mongo, close_mongo_connection
from app.api.routes import router as api_router

# The following imports are not used in this file but are good to have if you plan on adding them later
from app.services.redis_client import connect_to_redis, close_redis_connection
from app.api import voice


app = FastAPI(title="PMIO AI Assistant")

# --- CORS Settings ---
# In production, replace "*" with your specific frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
# It's better to keep your models in the `app/models/` directory
# but for this example, we'll keep them here to show the fix.
class VoiceInputPayload(BaseModel):
    text: str
    language: str

class UserProfile(BaseModel):
    name: str
    skills: list[str]
    education: str
    location: str

# You don't need UserContext since UserProfile already covers it.
# class UserContext(BaseModel):
#     skills: list[str]
#     location: str


# --- Mount the API Router ---
# This is the correct way to include all endpoints from routes.py
# It makes the endpoints from `app/api/routes.py` available under a prefix (e.g., /api).
app.include_router(api_router, prefix="/api")

# --- API Endpoints ---
@app.get("/")
async def root():
    return {"message": "SkillBridge assistant is running!"}

@app.post("/voice-input")
async def handle_voice_input(payload: VoiceInputPayload):
    print(f"Received voice input ({payload.language}): '{payload.text}'")
    return {"processedText": payload.text}

# --- Startup and Shutdown Events ---
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()
    await connect_to_redis() # Uncomment if you use Redis

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()
    await close_redis_connection() # Uncomment if you use Redis