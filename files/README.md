# Aidora AI — Frontend

A production-ready AI assistant frontend built with React 18, Tailwind CSS, and React Router.

## ✨ Features

- **Landing page** — animated hero, feature grid, stats, CTA sections
- **Authentication** — login & signup with real-time form validation
- **AI Chat interface** — ChatGPT-style UX with message bubbles, typing indicators, auto-scroll
- **Sidebar navigation** — conversation history, new chat, collapsible on mobile
- **Mock mode** — works without a backend for instant development
- **Fully responsive** — mobile-first, desktop-optimized

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server (mock mode on by default)
npm run dev
```

Open http://localhost:5173 in your browser.

In mock mode, you can sign up with **any email/password** (min 6 chars) and chat immediately — no backend required.

## ⚙️ Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Your backend API base URL |
| `VITE_USE_MOCK` | `true` to use mock responses (default) |

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── AuthForms.jsx       # Login & signup forms with validation
│   ├── chat/
│   │   ├── ChatWindow.jsx      # Scrollable message list + empty state
│   │   ├── ChatInput.jsx       # Message composition bar
│   │   └── MessageBubble.jsx   # User/AI message renderer
│   ├── common/
│   │   ├── Loader.jsx          # Spinner / dots / pulse variants
│   │   ├── Navbar.jsx          # Landing page navigation bar
│   │   └── ProtectedRoute.jsx  # Auth guard for private routes
│   └── sidebar/
│       └── Sidebar.jsx         # Collapsible navigation sidebar
├── context/
│   ├── AuthContext.jsx         # Global authentication state
│   └── ChatContext.jsx         # Conversation management state
├── hooks/
│   ├── useForm.js              # Form state + validation hook
│   ├── useLocalStorage.js      # Persistent state hook
│   └── useScrollToBottom.js    # Auto-scroll for chat
├── layouts/
│   ├── AuthLayout.jsx          # Centered card layout for auth pages
│   └── ChatLayout.jsx          # Sidebar + content shell
├── pages/
│   ├── LandingPage.jsx         # Public homepage
│   ├── LoginPage.jsx           # Login screen
│   ├── SignupPage.jsx          # Registration screen
│   ├── ChatPage.jsx            # Main AI chat interface
│   └── NotFoundPage.jsx        # 404 page
├── services/
│   ├── api.js                  # Axios instance with interceptors
│   ├── authService.js          # Auth API calls (login, signup, me)
│   └── chatService.js          # Chat API calls + mock fallback
└── styles/
    └── globals.css             # Global styles, custom scrollbar, animations
```

## 🔌 Backend API Contract

### Authentication

```
POST /api/auth/login    Body: { email, password }    → { user, token }
POST /api/auth/signup   Body: { name, email, password } → { user, token }
POST /api/auth/logout                                → 200 OK
GET  /api/auth/me                                    → { user }
```

### Chat

```
POST /api/chat/message
  Body: { message: string, history: Array<{ role: "user"|"assistant", content: string }> }
  → { message: string }   (or { response: string })
```

## 🏗️ Build for Production

```bash
npm run build
# Output in /dist
```

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#6c63ff` (accent purple) |
| Danger  | `#ff6b4a` (ember orange) |
| Background | `#080810` (void) |
| Surface | `#1a1a2e` |
| Typography | Syne (headings) + DM Sans (body) |

## 📄 License

MIT
