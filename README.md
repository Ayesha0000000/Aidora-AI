# Aidora-AI

## Project Summary

Aidora-AI is a **Real-Time Health Triage Assistant** that helps users receive quick guidance for minor health concerns using **camera input, voice interaction, and AI reasoning**.

The system allows users to interact with an AI assistant through a web interface. Users can provide text, voice, or image input, and the system processes the request through a backend API and sends it to **Google Gemini AI** to generate a response.

The project follows a modular architecture with separate **frontend, backend, and AI processing layers**, making it easy to extend and deploy.

---

# Features

• Text-based health question answering
• Voice input support
• Camera image analysis for visible symptoms
• AI-powered responses using Gemini AI
• FastAPI backend API
• React frontend interface
• Modular project structure

---

# Technologies Used

## Frontend

* React.js
* JavaScript
* HTML
* CSS

## Backend

* Python
* FastAPI
* Uvicorn

## AI Integration

* Google Gemini API

## Libraries

* Pillow (image processing)
* python-multipart (file upload support)

## Development Tools

* Git
* GitHub
* Draw.io (architecture diagram)

---

# Project Structure

```
aidora-ai/

├── backend/
│   ├── main.py
│   ├── triage.py
│   ├── image_handler.py
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
│           └── TriageResult.jsx
│
├── docs/
│   └── architecture-diagram.png
│
└── README.md
```

---

# How the System Works

The system follows this flow:

User → Frontend → Backend → Gemini AI → Response → User

1. The **user interacts with the React frontend** using text, voice, or camera input.
2. The frontend sends the request to the **FastAPI backend**.
3. The backend processes the input using modules such as **triage logic and image handler**.
4. The processed request is sent to **Google Gemini AI**.
5. Gemini generates a response.
6. The backend returns the result to the frontend.
7. The response is displayed to the user.

---

# Local Setup Instructions

## 1 Clone the repository

```
git clone https://github.com/Ayesha0000000/Aidora-AI.git
cd Aidora-AI
```

---

## 2 Backend Setup

Navigate to the backend folder:

```
cd backend
```

Install dependencies:

```
pip install -r requirements.txt
```

Create environment variable for Gemini API:

```
GEMINI_API_KEY=your_api_key
```

Run backend server:

```
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

## 3 Frontend Setup

Navigate to the frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the frontend server:

```
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# Third-Party Integrations

### Google Gemini API

Used for generating AI responses and analyzing user input.

### FastAPI

Provides the backend API that processes requests.

### React

Used for building the frontend user interface.

---

# Architecture Diagram

The system architecture diagram is located in:

```
docs/architecture-diagram.png
```

---

# Disclaimer

Aidora-AI provides **general health guidance only** and should not be used as a replacement for professional medical advice. Always consult a qualified healthcare professional for medical concerns.

# Hackathon Submission

This project is developed for:

Gemini Live Agent Challenge

#GeminiLiveAgentChallenge
