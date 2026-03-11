# Aidora Medical AI — React Frontend

## Setup

```bash
npm install
npm start
```

Opens at **http://localhost:3000**

Backend must be running at **http://localhost:8000**

```bash
# In backend folder:
uvicorn main:app --reload
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx / .module.css     ← Top bar
│   ├── Sidebar.jsx / .module.css    ← Navigation
│   └── Toast.jsx / .module.css      ← Notifications
├── pages/
│   ├── ChatPanel.jsx / .module.css  ← /health endpoint
│   ├── VoicePanel.jsx / .module.css ← /voice endpoint
│   └── VisionPanel.jsx / .module.css← /vision endpoint (upload + camera)
├── App.jsx / App.css                ← Root + layout
├── index.js                         ← Entry
└── index.css                        ← Global styles + CSS vars
```

## API Endpoints Used
- `POST /health` — text question → AI response
- `POST /voice`  — form text field → AI response  
- `POST /vision` — image file + optional note → AI analysis
