# AgroMind Deploy Notes

## Frontend (Vercel)
Root directory: `client`

### Required env var
```
VITE_API_URL=https://agromind-sji2.onrender.com/api
```

Must end with `/api` (or omit it — the client now auto-appends `/api`).

After changing env vars → **Redeploy** (Vite bakes env at build time).

## Backend (Render)
Root directory: `server`  
Start command: `npm start` (`node index.js`)

Env vars:
- `MONGODB_URI`
- `JWT_SECRET`
- `GEMINI_API_KEY`
- `WEATHER_API_KEY`

Health check: `https://YOUR-BACKEND.onrender.com/`  
Auth example: `https://YOUR-BACKEND.onrender.com/api/auth/login`

## Common error
`Demo login failed. Is the backend running?`
Usually means:
1. Backend asleep/offline, or
2. `VITE_API_URL` missing `/api` (fixed in client + set correctly on Vercel)
