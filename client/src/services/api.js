import axios from "axios";

function resolveBaseUrl() {
  const raw = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").trim();
  const cleaned = raw.replace(/\/+$/, "");
  return cleaned.endsWith("/api") ? cleaned : `${cleaned}/api`;
}

const API = axios.create({
  baseURL: resolveBaseUrl(),
});

export default API;
