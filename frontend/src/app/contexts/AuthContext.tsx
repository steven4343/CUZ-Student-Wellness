import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { auth } from "../../services/api";

interface User {
  id: number;
  email: string;
  full_name: string;
  student_id: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, full_name: string, student_id?: string) => Promise<void>;
  guestLogin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (token) {
      auth.me()
        .then((data) => {
          setUser(data.user);
          setIsGuest(data.user.role === "guest");
        })
        .catch(() => {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await auth.login(email, password);
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
    setIsGuest(false);
  };

  const register = async (email: string, password: string, full_name: string, student_id?: string) => {
    const data = await auth.register(email, password, full_name, student_id);
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
    setIsGuest(false);
  };

  const guestLogin = async () => {
    const data = await auth.guest();
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
    setIsGuest(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, isGuest, login, register, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
