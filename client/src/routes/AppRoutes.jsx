import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Landing from "../pages/Landing/Landing";
import Dashboard from "../pages/Dashboard";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import Detect from "../pages/Detect/Detect";
import Result from "../pages/Result/Result";
import History from "../pages/History/History";

function withLayout(page) {
  return <MainLayout>{page}</MainLayout>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={withLayout(<Landing />)} />
      <Route path="/auth" element={withLayout(<Auth />)} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>{withLayout(<Dashboard />)}</ProtectedRoute>
        }
      />
      <Route
        path="/detect"
        element={<ProtectedRoute>{withLayout(<Detect />)}</ProtectedRoute>}
      />
      <Route
        path="/result"
        element={<ProtectedRoute>{withLayout(<Result />)}</ProtectedRoute>}
      />
      <Route
        path="/history"
        element={<ProtectedRoute>{withLayout(<History />)}</ProtectedRoute>}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute>{withLayout(<Profile />)}</ProtectedRoute>}
      />
    </Routes>
  );
}

export default AppRoutes;
