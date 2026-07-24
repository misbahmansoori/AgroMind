import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Landing from "../pages/Landing/Landing";
import Dashboard from "../pages/Dashboard";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import Detect from "../pages/Detect/Detect";
import Result from "../pages/Result/Result";
import History from "../pages/History/History";
import Assistant from "../pages/Assistant/Assistant";

/*
  Auth flow (planned):
  - Public:  /  /auth
  - Protected later: /dashboard /detect /result /profile
  - Right now all app pages are open for demo until Auth is wired.
*/

function AppRoutes() {
  return (
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
        path="/detect"
        element={
          <MainLayout>
            <Detect />
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
        path="/result"
        element={
          <MainLayout>
            <Result />
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

      <Route
        path="/history"
        element={
          <MainLayout>
            <History />
          </MainLayout>
        }
      />

      <Route
        path="/assistant"
        element={
          <MainLayout>
            <Assistant />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
