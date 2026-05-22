import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppointmentScheduling from "./pages/AppointmentScheduling";
import AnonymousChat from "./pages/AnonymousChat";
import SelfHelpResources from "./pages/SelfHelpResources";
import PerformanceTracking from "./pages/PerformanceTracking";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/services/appointments" element={<ProtectedRoute><AppointmentScheduling /></ProtectedRoute>} />
            <Route path="/services/chat" element={<ProtectedRoute><AnonymousChat /></ProtectedRoute>} />
            <Route path="/services/resources" element={<ProtectedRoute><SelfHelpResources /></ProtectedRoute>} />
            <Route path="/services/tracking" element={<ProtectedRoute><PerformanceTracking /></ProtectedRoute>} />
            <Route path="/resources" element={<Navigate to="/services/resources" replace />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/counsellor" element={<Navigate to="/services/chat" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
