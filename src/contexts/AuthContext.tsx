"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of our auth context
interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: null,
  login: () => {},
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Provider component that wraps your app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    
    if (storedUsername && storedLoginStatus === "true") {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
