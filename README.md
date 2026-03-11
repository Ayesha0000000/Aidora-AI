# Aidora-AI

## Project Overview

Aidora-AI is an intelligent AI assistant built using **Google Gemini AI and Google Cloud**. The system allows users to interact with an AI agent through a modern web interface where requests are processed by a cloud backend and analyzed using Gemini to generate intelligent responses.

The goal of this project is to demonstrate how **multimodal AI agents can be integrated into real applications using Gemini and Google Cloud services**. The architecture separates the frontend, backend, and AI processing layers for scalability and maintainability.

System architecture pipeline:

User → Frontend → Backend → Gemini AI → Response → User

The backend service is deployed on **Google Cloud Run**, enabling serverless and scalable deployment.

---

## Features

### AI-Powered Interaction

Uses **Google Gemini API** to understand user input and generate intelligent responses.

### Cloud-Based Backend

Backend services are deployed using **Google Cloud Run**.

### Modular Architecture

Separate layers for frontend, backend, and AI integration.

### Image Handling

Supports image processing through a dedicated handler module.

### Triage Processing

Processes and categorizes user requests before sending them to Gemini AI.

### Scalable Deployment

Serverless architecture using Google Cloud services.

---

## Technologies Used

### Frontend

* React.js
* JavaScript
* HTML
* CSS

### Backend

* Python
* FastAPI

### Artificial Intelligence

* Google Gemini API

### Cloud Services

* Google Cloud Run

### Development Tools

* Git
* GitHub
* Draw.io (Architecture Diagram)

---

## Project Structure

aidora-ai/

backend/
├── main.py
├── triage.py
├── image_handler.py
├── requirements.txt
└── .env.example

frontend/
└── src/
├── App.js
├── index.js
└── components/
├── Camera.jsx
├── VoiceButton.jsx
└── TriageResult.jsx

docs/
└── architecture-diagram.png

README.md

---

## System Architecture

The system architecture consists of several layers.

### User Layer

Users interact with the system through a web interface.

### Frontend Layer

A React application captures user input and sends requests to the backend.

### Backend Layer

The backend processes requests, handles images, and communicates with Gemini AI.

### AI Layer

The Gemini API analyzes inputs and generates intelligent responses.

### Response Layer

Results are returned to the frontend and displayed to the user.

---

## Local Setup Instructions

### 1 Clone Repository

git clone https://github.com/Ayesha0000000/Aidora-AI.git
cd Aidora-AI

---

### 2 Backend Setup

Navigate to backend folder

cd backend

Install dependencies

pip install -r requirements.txt

Create environment variables

GEMINI_API_KEY=your_api_key

Run backend server

uvicorn main:app --reload

Backend will run at:

http://localhost:8000

---

### 3 Frontend Setup

Navigate to frontend

cd frontend

Install dependencies

npm install

Start frontend

npm start

Frontend will run at:

http://localhost:3000

---

## Cloud Deployment (Google Cloud Run)

### 1 Install Google Cloud CLI

https://cloud.google.com/sdk/docs/install

---

### 2 Login to Google Cloud

gcloud auth login

---

### 3 Build Container Image

gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/aidora-ai

---

### 4 Deploy to Cloud Run

gcloud run deploy aidora-ai 
--image gcr.io/YOUR_PROJECT_ID/aidora-ai 
--platform managed 
--region us-central1 
--allow-unauthenticated

After deployment, Google Cloud Run will provide a public API endpoint.

---

## Third-Party Integrations

### Google Gemini API

Provides AI reasoning and response generation.

### Google Cloud Run

Serverless backend hosting.

### React

Frontend user interface framework.

### FastAPI

Backend API framework.

---

## Architecture Diagram

The architecture diagram for this project is located in:

docs/architecture-diagram.png

---

## Hackathon Submission

This project is developed for:

Gemini Live Agent Challenge

#GeminiLiveAgentChallenge
