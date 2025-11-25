
import redis.asyncio as redis

REDIS_HOST = "redis-13668.c278.us-east-1-4.ec2.redns.redis-cloud.com"
REDIS_PORT = 13668
REDIS_PASSWORD = "vxq73c8N9vmoGhlknx56nTsqlMK3YyoY"

redis_client: redis.Redis | None = None

async def connect_to_redis():
    global redis_client
    redis_client = redis.Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        password=REDIS_PASSWORD,
        decode_responses=True
    )
    try:
        await redis_client.ping()
        print("✅ Connected to Redis")
    except Exception as e:
        print("❌ Redis connection failed:", e)

async def close_redis_connection():
    global redis_client
    if redis_client:
        await redis_client.close()
        print("❌ Redis connection closed")
