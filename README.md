#  Aidora-AI — Real-Time Health Assistant (Camera + Voice) 

[![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Gemini](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google/)
[![Google Cloud](https://img.shields.io/badge/Google-Cloud%20Run-EA4335?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/run)

Aidora-AI is a **multimodal AI health assistant** that lets users interact using **camera input** and **voice commands**. The system captures input from a modern web interface and processes requests through **Google Gemini AI**.

> Developed for the **Google Gemini Live Agent Challenge** using Google Gemini AI and Google Cloud technologies.

---

## 🎯 Project Overview

Aidora-AI combines **computer vision, voice communication, and AI reasoning** to build an intelligent assistant capable of understanding user input and generating meaningful responses.

**System Pipeline:**

```
User → Frontend → Backend → Gemini AI → Response → User
```

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📷 **Camera Interaction** | Capture images directly from the web interface; backend processes them for AI analysis |
| 🎤 **Voice Interaction** | Communicate with AI using voice input; voice data sent to backend for processing |
| 🧠 **AI-Powered Reasoning** | Google Gemini AI analyzes input and generates contextual responses |
| ☁️ **Cloud-Based Backend** | Deployed on Google Cloud Run for serverless, scalable deployment |
| 🧩 **Modular Architecture** | Clear separation of Frontend, Backend, and AI Integration |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────┐
│              USER LAYER                 │
│         Browser / Mobile App            │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│            FRONTEND LAYER               │
│   React.js — Camera · Voice · Display   │
│   Camera.jsx · VoiceButton.jsx · text.js│
└──────────────────┬──────────────────────┘
                   │  HTTP Request
                   ▼
┌─────────────────────────────────────────┐
│             BACKEND LAYER               │
│       Python + FastAPI — main.py        │
│   Processes requests, calls Gemini API  │
└──────────────────┬──────────────────────┘
                   │  Gemini API Call
                   ▼
┌─────────────────────────────────────────┐
│               AI LAYER                  │
│         Google Gemini API               │
│   Multimodal reasoning & response gen   │
└──────────────────┬──────────────────────┘
                   │  AI Response
                   ▼
        Back to Frontend → User

☁️  Entire Backend Deployed on Google Cloud Run (us-central1)
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, JavaScript, HTML, CSS |
| **Backend** | Python, FastAPI |
| **AI** | Google Gemini API |
| **Cloud** | Google Cloud Run |
| **Tools** | Git, GitHub, Draw.io |

---

## 📁 Project Structure

```
aidora-ai/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── components/
│           ├── Camera.jsx
│           ├── VoiceButton.jsx
│           └── text.js
├── docs/
│   └── architecture-diagram.png
└── README.md
```

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Ayesha0000000/Aidora-AI.git
cd Aidora-AI
```

### 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt

# Linux/macOS
export GEMINI_API_KEY=your_api_key

# Windows
set GEMINI_API_KEY=your_api_key

uvicorn main:app --reload
```

> Backend runs on: `http://localhost:8000`

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

> Frontend runs on: `http://localhost:3000`

---

## ☁️ Google Cloud Deployment

Deploy backend on Google Cloud Run:

```bash
gcloud run deploy aidora-ai --source . --region us-central1 --allow-unauthenticated
```

After deployment, Google Cloud provides a public endpoint URL for frontend-backend communication.

---

## 🔁 Testing Instructions

1. Run backend server
2. Launch frontend interface
3. Use camera module to capture an image
4. Use voice button to interact with AI
5. Backend processes request
6. Gemini AI generates response
7. Result displayed on frontend

---

## 🤝 Contributors — Team Genix

| Name | GitHub | Role / Responsibilities |
|---|---|---|
| **Ayesha** | [@Ayesha0000000](https://github.com/Ayesha0000000) | Error Solving, README Writing, Blog Writing, Frontend–Backend Integration |
| **Hizar Abdullah** | khizeristan | Gemini API Setup, Python + FastAPI Server, Gemini AI Integration, Demo Video, GCP Deployment |
| **Muhammad Mahaz Noor** | mahaznoor| React Frontend UI (Camera View, Mic Button, Result Display), Slides Preparation |
| **Muhammad Faraz** | Farax382 | Architecture Diagram (draw.io), Medium Blog Post (#GeminiLiveAgentChallenge) |

## 📚 Documentation

🌐 **Live Docs:** [https://aidora-doc-9f7q.vercel.app/](https://aidora-doc-9f7q.vercel.app/)

## ⚠️ Disclaimer

> Aidora-AI is designed for AI interaction and demonstration purposes.
> **It does not replace professional medical consultation.**

---

## ❤️ Acknowledgment

Developed for the **Google Gemini Live Agent Challenge** using **Google Gemini AI** and **Google Cloud** technologies.

Made with ❤️ by **Team Genix**
