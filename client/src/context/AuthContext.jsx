import { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

const STORAGE_KEY = "agromind_auth";

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    const parsed = JSON.parse(raw);
    return {
      user: parsed.user || null,
      token: parsed.token || null,
    };
  } catch {
    return { user: null, token: null };
  }
}

export function AuthProvider({ children }) {
  const [{ user, token }, setAuth] = useState(readStoredAuth);

  const login = (nextUser, nextToken) => {
    // Write sync BEFORE navigate so API calls immediately send Bearer token
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token: nextToken, user: nextUser }),
    );
    setAuth({ user: nextUser, token: nextToken });
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuth({ user: null, token: null });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export async function fetchCurrentUser() {
  const res = await api.get("/auth/me");
  return res.data.user;
}
