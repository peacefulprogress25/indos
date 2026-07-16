import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import type { AuthUser, AuthMeResponse, DevLoginResponse } from '../types';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, name: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check existing session on mount
  useEffect(() => {
    let cancelled = false;
    async function checkSession() {
      try {
        const data = await apiFetch<AuthMeResponse>('/api/auth/me');
        if (!cancelled && data?.user) {
          setUser(data.user);
        }
      } catch {
        // No session — stay on landing
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    checkSession();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (email: string, name: string) => {
    const data = await apiFetch<DevLoginResponse>('/api/auth/dev-login', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
    if (data?.user) {
      setUser({ id: data.user.id, email: data.user.email, name: data.user.name });
      navigate('/dashboard');
    }
  }, [navigate]);

  const loginWithGoogle = useCallback(() => {
    window.location.href = '/api/auth/google/login';
  }, []);

  const logout = useCallback(async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    navigate('/');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
