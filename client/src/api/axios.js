import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("agromind_auth");
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // ignore bad localStorage
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    const isAuthAttempt =
      url.includes("/auth/login") || url.includes("/auth/register");

    // Only kick out on protected-route 401s — never on failed login/register
    if (status === 401 && !isAuthAttempt) {
      localStorage.removeItem("agromind_auth");
      if (window.location.pathname !== "/auth") {
        window.location.assign("/auth");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
