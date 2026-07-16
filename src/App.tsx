import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './pages/DashboardLayout';
import AuthDialog from './components/AuthDialog';

// Pages — imported as lazy stubs for now, replaced in Tasks 4-8
import DashboardPage from './pages/DashboardPage';
import PlaygroundPage from './pages/PlaygroundPage';
import ApiKeysPage from './pages/ApiKeysPage';
import CreditsPage from './pages/CreditsPage';
import UsagePage from './pages/UsagePage';

export default function App() {
  const { user, loading } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060913] flex items-center justify-center">
        <span className="font-display font-bold text-2xl tracking-wider text-brand-orange animate-pulse">
          IND<span className="text-white">O</span>S
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060913] selection:bg-brand-orange selection:text-white">
      <Routes>
        <Route
          path="/"
          element={<LandingPage onOpenAuth={() => setIsAuthOpen(true)} />}
        />
        <Route
          element={user ? <DashboardLayout /> : <Navigate to="/" replace />}
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/keys" element={<ApiKeysPage />} />
          <Route path="/credits" element={<CreditsPage />} />
          <Route path="/usage" element={<UsagePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AuthDialog
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
