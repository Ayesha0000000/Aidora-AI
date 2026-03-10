from fastapi import FastAPI
from google.genai import Client

# Replace with your API key
client = Client(api_key="AIzaSyDN_kuL9S9MDqj9fyDUoPi53fFEIQ2B1Qo")

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Aidora AI backend running on Google Cloud"}

@app.get("/ask")
def ask(question: str):
    try:
        # Use responses.create for latest Gemini calls
        response = client.responses.create(
            model="gemini-1.5",
            text=question
        )
        return {"response": response.output_text}
    except Exception as e:
        return {"error": str(e)}
