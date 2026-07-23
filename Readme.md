# 🌱 AgroMind

> **AI-powered farming assistant that detects crop diseases, predicts risks, and provides personalized treatment — so farmers can act before the harvest is lost.**

**Team:** MindMesh · **Hackathon 2026**

---

## 🎯 Problem

Farmers often lack timely access to agricultural experts. Crop diseases and pests go unnoticed until damage is severe.

AgroMind helps farmers:

- Detect crop diseases from images
- Get organic & chemical treatment guidance
- Track crop health history
- Use AI assistance (Hindi / English planned)
- Connect with nearby agri support (planned)

---

## 🛠️ Tech Stack

| Layer | Stack |
|--------|--------|
| Frontend | React, Vite, Tailwind CSS, React Router, Framer Motion, Lucide, Axios |
| Backend | Node.js, Express.js, Multer |
| Database | MongoDB Atlas, Mongoose |
| AI | Google Gemini (`@google/genai`) |
| Planned APIs | Weather API, Maps, Speech, PDF |

---

## 📂 Project Structure

```
AgroMind/
├── client/                 # React frontend
│   └── src/
│       ├── components/
│       ├── pages/          # Landing, Dashboard, Detect, Result, Profile, Auth
│       ├── layouts/
│       ├── routes/
│       └── styles/
├── server/                 # Express backend
│   ├── config/             # MongoDB connection
│   ├── models/             # User, DiseaseHistory, Report
│   ├── routes/             # /api/detect
│   ├── services/           # gemini.js
│   └── index.js
├── PROJECT_CONTEXT.md
└── Readme.md
```

---

## ✅ Done

### Frontend UI
- [x] Landing page (Hero, Features, Dashboard Preview, How It Works, CTA, Footer)
- [x] Smart Farm Dashboard (Health, Weather, Risk, AI Recommendation, Timeline cards)
- [x] Disease Detection page (upload + analyzing UI)
- [x] Result / Crop Doctor page (diagnosis UI + reveal animation)
- [x] Profile page (mock farmer data)
- [x] Navbar / Footer / shared Button & Container
- [x] Routing: `/`, `/dashboard`, `/detect`, `/result`, `/profile`, `/auth`

### Backend & Database
- [x] Express server + CORS + env setup
- [x] MongoDB Atlas connection
- [x] User model
- [x] DiseaseHistory model (aligned with Crop Doctor fields)
- [x] Report model
- [x] `POST /api/detect` — image upload → Gemini → JSON diagnosis
- [x] Multi-model Gemini fallback + demo fallback if quota fails

### Git
- [x] GitHub repo + feature branches / PRs merged to `main`

---

## 🚧 Remaining (must for demo)

Priority order:

1. [ ] **Wire Detect UI → `/api/detect`** (send image from browser)
2. [ ] **Pass Gemini response → Result page** (replace mock data)
3. [ ] **Auth** — register/login + JWT (teammate)
4. [ ] **Protect routes** — dashboard / detect / result / profile
5. [ ] **Save scan** to `DiseaseHistory` after diagnosis
6. [ ] **Timeline** shows real history from DB
7. [ ] **Deploy** frontend + backend + env vars
8. [ ] **README demo steps** + **PPT** + backup demo video

---

## ✨ Optional (if time — Day 24)

- [ ] Live Weather API on dashboard
- [ ] Crop Doctor **PDF** download → save `Report`
- [ ] AI Farmer Assistant chatbot (text, Hindi/English)
- [ ] Voice Farmer Mode (speech-to-text / text-to-speech)
- [ ] Nearby KVK / experts / shops map
- [ ] Disease prediction from weather + history
- [ ] Irrigation / yield extras

**Cut first if behind:** Voice, Nearby map, Yield prediction.

---

## 🔀 Current Demo Flow

```
Landing → Dashboard → Detect → (API works in Postman/Hoppscotch)
                              ↘ Result still uses mock until frontend wiring
```

**Backend detect is live.** Next coding step: connect Detect page to Gemini API, then show real data on Result.

---

## ⚙️ Run locally

### Server
```bash
cd server
npm install
# add GEMINI_API_KEY and MONGO_URI in server/.env
npm run dev
# → http://localhost:5000
```

### Client
```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

### Test AI detect (API)
- **POST** `http://localhost:5000/api/detect`
- Body: `multipart/form-data`
- Field: `image` = crop photo file

---

## 👥 Team

| Member | Role |
|--------|------|
| Misbah | Main developer — frontend, backend, AI, deploy, GitHub |
| Monika | Database — MongoDB models, basic backend (`feature/database`) |

---

## ❤️ Built for

Hackathon 2026 — *Empowering farmers with Artificial Intelligence.*
