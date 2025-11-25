from typing import Optional
from redis.asyncio import Redis

redis_client: Optional[Redis] = None

async def connect_to_redis(url: str = "redis://localhost:6379") -> None:
    global redis_client
    if redis_client is None:
        redis_client = Redis.from_url(url)
        try:
            await redis_client.ping()
            print("Connected to Redis successfully!")
        except Exception as e:
            print(f"Redis connection error: {e}")
            redis_client = None

async def close_redis_connection() -> None:
    global redis_client
    if redis_client:
        await redis_client.close()
        redis_client = None
        print("Redis connection closed.")
