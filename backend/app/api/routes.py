from fastapi import APIRouter, HTTPException, Depends, Query
from app.models.user import UserProfile
from app.services.recommendations import recommend_internships

from app.services.mongodb import get_db
from bson import ObjectId

# ✅ FIXED: Import the mock data correctly. 
# Assuming you have a file named `mock_internships.py` with a list.
from app.api.mock_internships import mock_internships


router = APIRouter()

# Health check
@router.get("/health")
async def health_check():
    return {"status": "OK"}

# ✅ FIXED: Create user endpoint with dependency injection
@router.post("/user")
async def create_user(profile: UserProfile, db=Depends(get_db)):
    try:
        # Save profile to MongoDB
        result = await db["users"].insert_one(profile.dict())

        return {
            "message": "✅ User profile saved successfully!",
            "id": str(result.inserted_id),
            "user": profile.dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving user: {str(e)}")

# Get all internships (mock)
@router.get("/internships")
async def get_internships(skip: int = Query(0, ge=0), limit: int = Query(10, gt=0)):
    # The `mock_internships` variable is now defined and accessible
    paginated = mock_internships[skip: skip + limit]
    return paginated

# Recommendation endpoint
@router.post("/recommend")
async def recommend(profile: UserProfile, lang: str = "en"):
    # The `mock_internships` variable is now defined and accessible
    top_internships = recommend_internships(profile.dict(), mock_internships)

    if lang and lang != "en":
        try:
            top_internships = [translate_internship(i, lang) for i in top_internships]
        except Exception as e:
            print(f"Translation failed: {e}")
            # fallback to English
    return top_internships