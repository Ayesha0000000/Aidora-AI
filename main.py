from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from google import genai
from PIL import Image
import io

# -------------------------
# GEMINI API KEY
# -------------------------
API_KEY = "AIzaSyAYmiKMqpWRwNz9r6rNLgmc186IoYWSdzA"

client = genai.Client(api_key=API_KEY)

# -------------------------
# FASTAPI APP
# -------------------------
app = FastAPI(title="Aidora Medical AI")

# -------------------------
# DATA MODEL
# -------------------------
class HealthQuestion(BaseModel):
    question: str


# -------------------------
# HOME ROUTE
# -------------------------
@app.get("/")
def home():
    return {"message": "Aidora Medical AI API Running"}


# -------------------------
# TEXT MEDICAL AI
# -------------------------
@app.post("/health")
def health_agent(data: HealthQuestion):

    prompt = f"""
You are a helpful medical assistant.

Give safe general medical advice.
Do not provide dangerous medical instructions.

Always recommend consulting a doctor for serious symptoms.

Patient question:
{data.question}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return {
        "type": "text",
        "response": response.text
    }


# -------------------------
# VOICE INPUT (TEXT FROM SPEECH)
# -------------------------
@app.post("/voice")
def voice_agent(text: str = Form(...)):

    prompt = f"""
You are a medical AI assistant.

Patient said:
{text}

Provide safe medical advice.
Recommend seeing a doctor if needed.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return {
        "type": "voice",
        "patient_text": text,
        "response": response.text
    }


# -------------------------
# CAMERA / IMAGE ANALYSIS
# -------------------------
@app.post("/vision")
async def vision_agent(file: UploadFile = File(...), note: str = Form(None)):

    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    prompt = f"""
You are a medical AI assistant.

Analyze the patient image carefully.

Patient description (if provided):
{note}

Give general medical guidance only.
Do not give a final diagnosis.
Recommend visiting a doctor if the condition looks serious.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[prompt, image]
    )

    return {"analysis": response.text}