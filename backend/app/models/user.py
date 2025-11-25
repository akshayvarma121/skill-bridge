from pydantic import BaseModel, Field
from typing import List

class UserProfile(BaseModel):
    name: str = Field(..., example="Akshay Varma")
    skills: List[str] = Field(..., example=["Python", "FastAPI", "AI"])
    education: str = Field(..., example="B.Tech in Computer Science")
    location: str = Field(..., example="Bangalore, India")
