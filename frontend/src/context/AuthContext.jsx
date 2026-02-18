import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for API key and fetch user
  useEffect(() => {
    const apiKey = localStorage.getItem("ckanApiKey");
    if (!apiKey) {
      setUser(null);
      setLoading(false);
      return;
    }
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        setUser(null);
        localStorage.removeItem("ckanApiKey");
      })
      .finally(() => setLoading(false));
  }, []);

  // Login: store API key and fetch user
  const login = async (apiKey) => {
    localStorage.setItem("ckanApiKey", apiKey);
    setLoading(true);
    try {
      const u = await getCurrentUser();
      setUser(u);
      setLoading(false);
      return u;
    } catch (err) {
      console.error("Login failed, clearing user state", err);
      localStorage.removeItem("ckanApiKey");
      setUser(null);
      setTimeout(() => setUser(null), 0); // force re-render
      setLoading(false);
      throw err;
    }
  };

  // Logout: clear API key and user
  const logout = () => {
    localStorage.removeItem("ckanApiKey");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
