import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ckanRequest } from "../utils/ckanApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const login = async (apiToken) => {
    setToken(apiToken);
    try {
      const userData = await ckanRequest("user_show", {}, apiToken);
      setUser(userData);
      setIsAdmin(!!userData.sysadmin);
      if (!userData.sysadmin) throw new Error("Not a CKAN sysadmin");
    } catch (err) {
      setToken(null);
      setUser(null);
      setIsAdmin(false);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
