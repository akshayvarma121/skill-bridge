from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "FastAPI Project"
    MONGO_URI: str = "mongodb://localhost:27017"
    REDIS_URI: str = "redis://localhost:6379"

settings = Settings()

