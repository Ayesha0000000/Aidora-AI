Aidora — Real-Time Health Assistant (Camera + Voice + Text)










Aidora-AI is a multimodal AI health assistant that allows users to interact with an AI system using camera input and voice interaction.

The system captures user input from a modern web interface and processes requests through a backend API integrated with Google Gemini AI. The AI analyzes the information and generates intelligent responses.

The goal of the project is to demonstrate how multimodal AI agents can be integrated into real-world applications using Google Gemini and Google Cloud services.

This project was developed for the Gemini Live Agent Challenge.

🎯 Project Overview

Aidora-AI combines computer interaction, voice communication, and AI reasoning to build an intelligent assistant capable of understanding user inputs and generating meaningful responses.

The system follows a modular architecture where each component has a specific responsibility.

System pipeline:

User → Frontend → Backend → Gemini AI → Response → User

🚀 Key Features
📷 Camera Interaction

Users can capture images directly from the web interface.

The system processes the image and sends it to the backend for analysis.

🎤 Voice Interaction

Users can communicate with the AI assistant using voice input.

Voice data is processed and forwarded to the backend.

🧠 AI Powered Reasoning

Google Gemini AI analyzes user input and generates contextual responses.

☁️ Cloud-Based Backend

The backend is deployed on Google Cloud Run, allowing serverless and scalable deployment.

🧩 Modular Architecture

Clear separation between Frontend, Backend, and AI integration.

🏗 System Architecture
User Layer

Users interact with the system through the web interface.

Frontend Layer

Captures image or voice input from the user.

Backend Layer

Processes requests and communicates with Gemini AI.

AI Layer

Gemini AI analyzes inputs and generates intelligent responses.

Response Layer

The response is sent back to the frontend and displayed to the user.

🛠 Technology Stack

Frontend: React.js, JavaScript, HTML, CSS
Backend: Python, FastAPI
Artificial Intelligence: Google Gemini API
Cloud Infrastructure: Google Cloud Run
Development Tools: Git, GitHub, Draw.io

📁 Project Structure
aidora-ai/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── components/
│           ├── Camera.jsx
│           ├── VoiceButton.jsx
│           └── text.js
│
├── docs/
│   └── architecture-diagram.png
│
└── README.md
⚙️ Local Setup Instructions
1. Clone Repository
git clone https://github.com/Ayesha0000000/Aidora-AI.git
cd Aidora-AI
2. Backend Setup
cd backend
pip install -r requirements.txt

Create environment variable:
GEMINI_API_KEY=your_api_key

Run backend server:
uvicorn main:app --reload

Backend runs on http://localhost:8000

3. Frontend Setup
cd frontend
npm install
npm start

Frontend runs on http://localhost:3000

☁️ Google Cloud Deployment

Backend service deployed using Google Cloud Run.

Deployment steps:

gcloud run deploy aidora-ai \
--source . \
--region us-central1 \
--allow-unauthenticated

Google Cloud provides a public endpoint URL which the frontend uses to communicate with the backend API.

🔁 Reproducible Testing Instructions

Run the backend server.

Launch the frontend interface.

Capture an image using the camera module.

Use the voice button to interact with the AI assistant.

Backend processes the request.

Gemini AI generates a response.

Result is displayed on the frontend.

🎥 Demo Video

Watch the working demo of Aidora-AI:
(Add YouTube or Vimeo link here)

🤝 Contributors
Name	GitHub	Role / Responsibilities
Ayesha	Ayesha0000000	Error Solving, README Writing, Blog Writing, Frontend–Backend Integration
Hizar Abdullah	—	Gemini API Setup, Python + FastAPI Server, Gemini AI Integration, Demo Video Recording, GCP Deployment (Cloud Run / Vertex AI) + Proof
Muhammad Mahaz Noor	—	React Frontend UI (Camera View, Mic Button, Result Display), Slides Preparation
Muhammad Faraz	—	Architecture Diagram (draw.io), Medium Blog Post (#GeminiLiveAgentChallenge)
⚠️ Disclaimer

Aidora-AI is designed for AI interaction and demonstration purposes.
It does not replace professional medical consultation.

❤️ Acknowledgment

Developed for the Google Gemini Live Agent Challenge using Google Gemini AI and Google Cloud technologies.
Made by Team Genix.
