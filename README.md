#  Aidora-AI — Real-Time Health Assistant (Camera + Voice) 

[![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Gemini](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google/)
[![Google Cloud](https://img.shields.io/badge/Google-Cloud%20Run-EA4335?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/run)

Aidora-AI is a **multimodal AI health assistant** that lets users interact using **camera input** and **voice commands**. The system captures input from a modern web interface and processes requests through **Google Gemini AI**.



---

## 🎯 Project Overview

Aidora-AI combines **computer vision, voice communication, and AI reasoning** to build an intelligent assistant capable of understanding user input and generating meaningful responses.

> 🏆 Built for the **[#GeminiLiveAgentChallenge](https://ai.google/)** — a platform that gave us the opportunity to build something truly meaningful. Without this challenge, Aidora would have remained just an idea. Thank you for pushing us to build for good.



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

![Aidora Architecture Diagram](https://raw.githubusercontent.com/Ayesha0000000/Aidora-AI/main/docs/Detail%20digram.png)

---
## 🎬 Demo Video

Watch Aidora-AI in action:

[![Aidora-AI Demo Video](https://img.youtube.com/vi/9mqi-UfkDYA/maxresdefault.jpg)](https://www.youtube.com/watch?v=9mqi-UfkDYA)

> 🔗 **[Click to Watch Full Demo on YouTube](https://www.youtube.com/watch?v=9mqi-UfkDYA)**

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, JavaScript, HTML, CSS |
| **Backend** | Python, FastAPI |
| **AI** | Google Gemini API |
| **Cloud** | Google Cloud Run |
| **Tools** | Git, GitHub, Draw.io |

---
## 🖥️ UI Preview

![Aidora-AI Voice Page UI](https://github.com/Ayesha0000000/Aidora-AI/blob/main/Voice%20page%20ui.png?raw=true)

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
🌟 All members of Team Genix are **Active Members of Google Developer Groups (GDG)** — proudly building with Google technologies and contributing to the developer community.


| Name | GitHub | Role / Responsibilities |
|---|---|---|
| **Ayesha** | [@Ayesha0000000](https://github.com/Ayesha0000000) | Error Solving, README Writing, Blog Writing, Frontend–Backend Integration |
| **Hizar Abdullah** | khizeristan | Gemini API Setup, Python + FastAPI Server, Gemini AI Integration, Demo Video, GCP Deployment |
| **Muhammad Mahaz Noor** | mahaznoor| React Frontend UI (Camera View, Mic Button, Result Display), Slides Preparation |
| **Muhammad Faraz** | Farax382 | Architecture Diagram (draw.io), Medium Blog Post (#GeminiLiveAgentChallenge) |

## 📚 Documentation

🌐 **Live Docs:** [https://aidora-doc-9f7q.vercel.app/](https://aidora-doc-9f7q.vercel.app/)
   ## 🏆 Hackathon Submission
👉 **[View Our Devpost Submission](https://devpost.com/submit-to/28633-gemini-live-agent-challenge/manage/submissions)**

## ⚠️ Disclaimer

> Aidora-AI is designed for AI interaction and demonstration purposes.
> **It does not replace professional medical consultation.**

---

## ❤️ Acknowledgment

We are deeply grateful to the **[#GeminiLiveAgentChallenge](https://ai.google/)** for giving us the opportunity to build Aidora. This challenge didn't just give us a platform — it gave us a purpose. It pushed our team to think beyond code and build something that could genuinely help people in their most vulnerable moments. Thank you for making this possible.

Developed using **Google Gemini AI** and **Google Cloud** technologies.

Made with ❤️ by **Team Genix**
