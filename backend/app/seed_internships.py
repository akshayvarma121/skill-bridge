# seed_internships.py
from pymongo import MongoClient

# Connect to Mongo
client = MongoClient("mongodb://localhost:27017")  # update if needed
db = client["Cluster0"]  # your database
collection = db["internships"]

# Demo data
dummy_data = [
    {
        "title": "Python Developer Intern",
        "company": "TechCorp",
        "skills": ["Python", "FastAPI", "SQL"],
        "location": "Bangalore",
        "duration": "3 Months"
    },
    {
        "title": "Frontend Developer Intern",
        "company": "Webify",
        "skills": ["React", "JavaScript", "CSS"],
        "location": "Remote",
        "duration": "2 Months"
    },
    {
        "title": "Data Science Intern",
        "company": "DataWorks",
        "skills": ["Python", "Machine Learning", "Pandas"],
        "location": "Pune",
        "duration": "6 Months"
    }
]

# Seed only if collection is empty
if collection.count_documents({}) == 0:
    collection.insert_many(dummy_data)
    print("✅ Dummy internships inserted!")
else:
    print("⚡ Collection already has data, skipping insert.")
