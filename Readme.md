# AgroMind

**AI-powered farming assistant for crop disease detection, treatment guidance, weather-aware risk insights, and multilingual farmer support.**

AgroMind helps farmers identify plant diseases from leaf images, understand the diagnosis, follow organic-first treatment plans, track scan history, and ask farming questions in English or Hindi - including voice input and spoken replies.

**Live demo:** [https://agro-mind-ochre.vercel.app/](https://agro-mind-ochre.vercel.app/)

---

## Features

### Core
- **AI Disease Detection** — Upload a crop leaf image for Gemini Vision analysis (disease, confidence, severity)
- **Crop Doctor Report** — Explanation, organic & chemical treatment, prevention, recovery time, and estimated cost
- **PDF Report Download** — Export a structured diagnosis report
- **Smart Farm Dashboard** — Health score, disease risk, live weather, recommendations, and scan timeline
- **Crop Health History** — Per-user scan history with filters and delete
- **Authentication** — JWT-based register/login with protected farm routes

### Intelligence & Accessibility
- **Live Weather Insights** — OpenWeather integration with GPS (profile location fallback) and farm-risk tips
- **AI Farmer Assistant** — Short, practical Q&A focused on agriculture (same language as the question)
- **Voice Mode** — Browser speech-to-text and text-to-speech for hands-free use
- **Hindi / English UI** — Dashboard language toggle with translation of diagnosis content when needed

---

## Tech Stack

| Layer | Technologies |
|--------|----------------|
| Frontend | React, Vite, Tailwind CSS, React Router, Framer Motion, Axios, jsPDF |
| Backend | Node.js, Express, Multer, JWT, bcrypt |
| Database | MongoDB Atlas, Mongoose |
| AI | Google Gemini (`@google/genai`) — vision + text |
| External APIs | OpenWeatherMap |
| Voice | Web Speech API (SpeechRecognition + speechSynthesis) |

---

## Architecture

```
Browser (React / Vite)
        │  REST + JWT
        ▼
Express API
        ├── /api/auth        → User accounts
        ├── /api/detect      → Image → Gemini Vision → DiseaseHistory
        ├── /api/history     → User scan timeline
        ├── /api/assistant   → Farming chatbot
        ├── /api/weather     → Live weather + farm tips
        └── /api/translate   → Hindi translation for diagnosis fields
                │
                ├── MongoDB Atlas
                ├── Google Gemini
                └── OpenWeatherMap
```

---

## Project Structure

```
AgroMind/
├── client/                      # Frontend application
│   └── src/
│       ├── api/                 # Axios client (JWT + API base URL)
│       ├── components/          # UI components (Navbar, cards, Assistant, etc.)
│       ├── context/             # Auth & language providers
│       ├── hooks/               # Speech recognition / synthesis
│       ├── i18n/                # Dashboard EN/HI copy
│       ├── layouts/             # Main layout (Navbar + Footer)
│       ├── pages/               # Landing, Auth, Dashboard, Detect, Result, …
│       ├── routes/              # App routing + protected routes
│       ├── services/            # Weather / translate API helpers
│       └── utils/               # Location, speech helpers
│
└── server/                      # Backend API
    ├── config/                  # MongoDB connection
    ├── controllers/             # Auth, weather, assistant, translate
    ├── middleware/              # JWT protect
    ├── models/                  # User, DiseaseHistory, Report
    ├── routes/                  # API route modules
    ├── services/                # Gemini vision + translation
    └── index.js                 # Server entry
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas connection string (or local MongoDB)
- Google Gemini API key
- OpenWeatherMap API key

### 1. Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
WEATHER_API_KEY=your_openweather_api_key
```

Start the API:

```bash
npm run dev
# or
npm start
```

API base: `http://localhost:5000`

### 2. Frontend

```bash
cd client
npm install
```

Optional `client/.env` (defaults to local API):

```env
VITE_API_URL=http://localhost:5000/api
```

Start the app:

```bash
npm run dev
```

App: `http://localhost:5173`

---

## Application Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/auth` | Login / register / demo access |
| `/dashboard` | Farm overview (protected) |
| `/detect` | Upload crop image (protected) |
| `/result` | Crop Doctor diagnosis (protected) |
| `/history` | Scan history (protected) |
| `/assistant` | AI farmer chat + voice (protected) |
| `/profile` | Farmer profile (protected) |

---

## API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | No | Create account |
| `POST` | `/api/auth/login` | No | Login, returns JWT |
| `GET` | `/api/auth/me` | Yes | Current user |
| `POST` | `/api/detect` | Yes | Upload `image` (multipart) → diagnosis |
| `GET` | `/api/history` | Yes | List user scans |
| `DELETE` | `/api/history/:id` | Yes | Delete a scan |
| `POST` | `/api/assistant` | Soft | Farming assistant reply |
| `GET` | `/api/weather` | Soft | Weather by `lat`/`lon` or `city` |
| `POST` | `/api/translate` | Soft | Translate diagnosis fields to Hindi |

Detect request field name: **`image`**

---

## User Flow

```
Landing → Auth → Detect (upload leaf)
                → Result (Crop Doctor + PDF)
                → Dashboard (health, weather, risk, timeline)
                → History / Assistant / Profile
```

---

## Deployment

### Frontend (e.g. Vercel)
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable:

```env
VITE_API_URL=https://YOUR-BACKEND-URL/api
```

`VITE_*` variables are applied at **build time** — redeploy after changing them.

### Backend (e.g. Render)
- Root directory: `server`
- Start command: `npm start`
- Set the same secrets as in `server/.env`
- Ensure MongoDB Atlas network access allows your host (`0.0.0.0/0` for cloud demos)

---

## Notes

- Gemini may hit free-tier quotas; the detect service includes multi-model fallback and a demo diagnosis path so the UI can still complete.
- Weather uses browser geolocation when available; otherwise it falls back to the farmer profile location.
- Voice features work best in Chromium-based browsers (Chrome / Edge) over HTTPS or localhost.

---

## License

ISC
