"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface IAuthContext {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context
// We cast 'null' to the type to satisfy TypeScript
const AuthContext = createContext<IAuthContext>(null as any);

// Create the provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // In a real app, 'login' would involve an API call
  const login = () => {
    console.log("Faking login...");
    setIsLoggedIn(true);
  };

  const logout = () => {
    console.log("Faking logout...");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
