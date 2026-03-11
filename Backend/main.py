from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from PIL import Image
import tempfile
import os
import io
import base64
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=API_KEY)

app = FastAPI(title="Aidora Medical AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthQuestion(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "Aidora Medical AI API Running"}

@app.post("/health")
def health_agent(data: HealthQuestion):
    prompt = f"You are a helpful medical assistant. Give safe general medical advice. Always recommend consulting a doctor for serious symptoms.\n\nPatient question:\n{data.question}"
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    return {"type": "text", "response": response.text}

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    audio_bytes = await file.read()

    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name

    try:
        with open(tmp_path, "rb") as f:
            audio_data = f.read()

        audio_b64 = base64.b64encode(audio_data).decode("utf-8")

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                {
                    "parts": [
                        {
                            "inline_data": {
                                "mime_type": "audio/webm",
                                "data": audio_b64
                            }
                        },
                        {
                            "text": "Transcribe exactly what is spoken in this audio. Return only the transcribed text, nothing else."
                        }
                    ]
                }
            ]
        )
        text = response.text.strip()
    except Exception as e:
        return {"text": "", "error": str(e)}
    finally:
        os.unlink(tmp_path)

    return {"text": text}

@app.post("/voice")
def voice_agent(text: str = Form(...)):
    prompt = f"You are a medical AI assistant.\nPatient said: {text}\nProvide safe medical advice. Recommend seeing a doctor if needed."
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    return {"type": "voice", "patient_text": text, "response": response.text}

@app.post("/vision")
async def vision_agent(file: UploadFile = File(...), note: str = Form(None)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))
    prompt = f"You are a medical AI assistant. Analyze the patient image carefully. Patient description: {note}. Give general medical guidance only. Do not give a final diagnosis."
    response = client.models.generate_content(model="gemini-2.5-flash", contents=[prompt, image])
    return {"analysis": response.text}