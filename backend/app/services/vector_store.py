
import aioredis
import numpy as np

redis = None

async def connect_redis():
    global redis
    redis = await aioredis.from_url("redis://localhost:6379", encoding="utf-8", decode_responses=True)
    print("✅ Connected to Redis")

async def close_redis():
    global redis
    if redis:
        await redis.close()
        print("❌ Redis connection closed")

async def add_vector(key: str, vector: list):
    """Store a vector in Redis"""
    await redis.hset("vectors", key, np.array(vector).tolist())

async def similarity_search(user_vector: list, top_k: int = 3):
    """Return top_k nearest internships"""
    results = []
    all_vectors = await redis.hgetall("vectors")  # key -> vector
    for k, v in all_vectors.items():
        v = np.array(eval(v))
        score = np.dot(user_vector, v) / (np.linalg.norm(user_vector) * np.linalg.norm(v))
        results.append((k, score))
    results.sort(key=lambda x: x[1], reverse=True)
    return results[:top_k]
