from fastapi import APIRouter, UploadFile, File, HTTPException
import aiohttp
import os

router = APIRouter()

ASSEMBLYAI_API_KEY = os.getenv("ASSEMBLYAI_API_KEY")

@router.post("/voice-input")
async def voice_input(file: UploadFile = File(...)):
    """
    Receives audio file, forwards it to AssemblyAI for transcription, returns text.
    """
    try:
        if not ASSEMBLYAI_API_KEY:
            raise HTTPException(status_code=500, detail="AssemblyAI API key not configured")

        # Save uploaded file temporarily
        temp_file = f"temp_{file.filename}"
        with open(temp_file, "wb") as f:
            f.write(await file.read())

        # Upload file to AssemblyAI
        headers = {"authorization": ASSEMBLYAI_API_KEY}
        async with aiohttp.ClientSession() as session:
            with open(temp_file, "rb") as f:
                async with session.post(
                    "https://api.assemblyai.com/v2/upload", headers=headers, data=f
                ) as resp:
                    upload_response = await resp.json()

        audio_url = upload_response.get("upload_url")
        if not audio_url:
            raise HTTPException(status_code=500, detail="Upload failed to AssemblyAI")

        # Request transcription
        json_data = {"audio_url": audio_url}
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "https://api.assemblyai.com/v2/transcript", headers=headers, json=json_data
            ) as resp:
                transcript_response = await resp.json()

        transcript_id = transcript_response["id"]

        # Poll until transcription is done
        while True:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    f"https://api.assemblyai.com/v2/transcript/{transcript_id}",
                    headers=headers,
                ) as resp:
                    result = await resp.json()
            if result["status"] == "completed":
                return {"transcription": result["text"]}
            elif result["status"] == "error":
                raise HTTPException(status_code=500, detail=f"Transcription error: {result['error']}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
