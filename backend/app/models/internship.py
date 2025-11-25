from pydantic import BaseModel
from typing import List

class Internship(BaseModel):
    title: str
    skills_required: List[str]
    sector: str
    location: str
    stipend: str
    match_percentage: float
