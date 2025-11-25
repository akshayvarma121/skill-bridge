---
## ⚙️ Backend Setup File


```markdown
# PMIO Backend ⚙️

This is the FastAPI backend for the PMIO project. It handles user registration, voice data processing, and generates personalized internship recommendations using connections to MongoDB and Redis.

## Prerequisites

- Python (v3.10 or later)
- pip (comes with Python)
- A running MongoDB instance
- A running Redis instance

## 1. Installation

Clone the repository and navigate into the backend directory. It is highly recommended to create and activate a virtual environment.

```bash
# Create a virtual environment
python -m venv venv

# Activate the environment (on Windows)
.\venv\Scripts\activate

# Activate the environment (on macOS/Linux)
source venv/bin/activate
Once the virtual environment is active, install the required Python packages from the requirements.txt file.

Bash

pip install -r requirements.txt



2. Environment Setup
The application requires connection details for your databases.

Create a new file in the root of the backend folder named .env.

Add your database credentials to the file. Below is an example:

# MongoDB Connection String (replace with your own)
MONGO_URI=mongodb://localhost:27017/pmio_db

# Redis Credentials (replace with your own)
REDIS_HOST=your-redis-host.com
REDIS_PORT=12345
REDIS_PASSWORD=your-redis-password
3. Running the Application
To start the FastAPI server with live reloading, run:

Bash

uvicorn main:app --reload
The API will be available at http://127.0.0.1:8000. You can access the auto-generated API documentation at http://127.0.0.1:8000/docs.