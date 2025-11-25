from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb+srv://varmaakshay2020_db_user:ebDXgmPrauiu6gwZ@cluster0.actkxov.mongodb.net/ai_assistant?retryWrites=true&w=majority"

_client = None
_db = None

async def connect_to_mongo():
    global _client, _db
    _client = AsyncIOMotorClient(MONGO_URL)
    _db = _client["ai_assistant"]   # specify db name
    print("✅ Connected to MongoDB Atlas:", _db.name)

async def close_mongo_connection():
    global _client
    if _client:
        _client.close()
        print("❌ MongoDB connection closed")

def get_db():
    """
    Dynamically return the database object.
    Raises exception if MongoDB is not initialized yet.
    """
    if _db is None:
        raise Exception("MongoDB connection not initialized")
    return _db
