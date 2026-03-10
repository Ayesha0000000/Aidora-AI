<<<<<<< HEAD
# Aidora AI – Medical Assistant Backend

Aidora AI is an AI‑powered medical assistant backend built using FastAPI.  
It allows patients to interact with an AI system using text, voice, and camera input.

The system uses Google's Gemini AI model to analyze symptoms and provide safe general medical guidance.

⚠️ This project is designed for educational and research purposes. It does not replace professional medical advice.

------------------------------------------------------------

## Features

• AI powered medical question answering  
• Voice input processing  
• Camera image analysis for visible symptoms  
• REST API backend built with FastAPI  
• Easy integration with web frontend  
• Real‑time AI responses using Gemini model  

------------------------------------------------------------

## Tech Stack

Backend Framework:
FastAPI

Server:
Uvicorn

AI Model:
Google Gemini

Programming Language:
Python

Libraries:
Pillow (image processing)  
python-multipart (file upload support)

------------------------------------------------------------

## API Endpoints

### 1. Server Status

GET /

Returns server status.

Example response:

{
  "message": "Aidora Medical AI API Running"
}

------------------------------------------------------------

### 2. Text Medical Assistant

POST /health

Send a medical question as text.

Example request:

{
  "question": "I have fever and headache for two days"
}

Example response:

{
  "type": "text",
  "response": "Fever and headache may be caused by viral infection..."
}

------------------------------------------------------------

### 3. Voice Input

POST /voice

Send speech converted to text from the frontend.

Form Data:

text = "I feel chest pain and dizziness"

Example response:

{
  "type": "voice",
  "patient_text": "I feel chest pain and dizziness",
  "response": "Chest pain can have several causes..."
}

------------------------------------------------------------

### 4. Vision / Camera Analysis

POST /vision

Upload an image captured from the camera showing visible symptoms such as:

• Skin rash  
• Wound  
• Infection  
• Swelling  
• Eye redness  

The AI analyzes the image and provides general medical guidance.

Example response:

{
  "type": "vision",
  "analysis": "The image appears to show skin irritation..."
}

------------------------------------------------------------

## Installation

Clone the repository from GitHub.

git clone https://github.com/Ayesha0000000/Aidora-AI.git

Move into the backend folder.

cd aidora-backend

------------------------------------------------------------

## Create Virtual Environment

Create a Python virtual environment.

python -m venv venv

Activate the environment.

Windows:

venv\Scripts\activate

Linux / Mac:

source venv/bin/activate

------------------------------------------------------------

## Install Dependencies

Install required libraries.

pip install -r requirements.txt

------------------------------------------------------------

## Environment Variables

Set your Gemini API key.

Windows:

setx GEMINI_API_KEY "YOUR_API_KEY"

Linux / Mac:

export GEMINI_API_KEY="YOUR_API_KEY"

------------------------------------------------------------

## Run the Server

Start the FastAPI server using Uvicorn.

uvicorn main:app --reload

Server will run at:

http://127.0.0.1:8000

------------------------------------------------------------

## API Documentation

FastAPI automatically generates interactive documentation.

Open in browser:

http://127.0.0.1:8000/docs

You can test all endpoints directly from this page.

------------------------------------------------------------

## Project Structure

aidora-backend

main.py  
requirements.txt  
README.md  

------------------------------------------------------------

## Future Improvements

• Live camera streaming for real‑time analysis  
• Voice conversation with AI assistant  
• Patient history tracking  
• Emergency symptom detection  
• Deployment to cloud server  

------------------------------------------------------------

## Disclaimer

This AI system provides general health information only.  
It should not be used as a substitute for professional medical advice, diagnosis, or treatment.

Always consult a qualified healthcare professional for serious medical conditions.

------------------------------------------------------------

## Author

Hizar Abdullah
=======
# Aidora-AI
Real-Time Health Triage Agent (Camera + Voice)

The  **Real-Time Health Triage Agent** is a live, multimodal AI system designed to provide immediate, intelligent guidance during minor medical concerns using a combination of camera input and voice interaction. The agent observes visual symptoms—such as skin rashes, minor injuries, or medication labels—while simultaneously engaging the user in a dynamic conversational loop to gather contextual information.

Unlike diagnostic tools, this system performs **triage assessment**, meaning it evaluates the urgency level of a condition rather than diagnosing diseases. By combining real-time vision analysis, contextual memory tracking, and bidirectional voice communication, the agent classifies cases into urgency tiers (low, moderate, high) and provides safe, actionable next-step guidance.

The system is built on a live streaming architecture, enabling:

* Continuous visual analysis
* Natural voice-based interaction
* Context retention across follow-up questions
* Real-time reasoning and response generation

This solution addresses a critical gap in early-stage health decision-making—especially in regions where immediate medical consultation is not always accessible. It empowers users with structured, safety-aware guidance while clearly reinforcing that it does not replace professional medical care.

In essence, the Real-Time Health Triage Agent functions as an intelligent first-response assistant, delivering rapid, multimodal assessment to support informed and timely health decisions.
>>>>>>> fbf943b1a921f8c104e30d3a0015c3f9fc8c6f29
