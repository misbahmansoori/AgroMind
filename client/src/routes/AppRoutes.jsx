import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Landing from "../pages/Landing/Landing";
import Dashboard from "../pages/Dashboard";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
  <Routes>

    <Route
      path="/"
      element={
        <MainLayout>
          <Landing />
        </MainLayout>
      }
    />

    <Route
      path="/dashboard"
      element={
        <MainLayout>
          <Dashboard />
        </MainLayout>
      }
    />

    <Route
      path="/auth"
      element={
        <MainLayout>
          <Auth />
        </MainLayout>
      }
    />

    <Route
      path="/profile"
      element={
        <MainLayout>
          <Profile />
        </MainLayout>
      }
    />

  </Routes>
</BrowserRouter>
  );
}

export default AppRoutes;
