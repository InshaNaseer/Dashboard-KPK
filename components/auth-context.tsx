"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type User, authenticateUser } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isReady: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsHydrated(true);
  }, []);

  const login = (email: string) => {
    const authenticatedUser = authenticateUser(email);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  if (!isHydrated) {
    return (
      <AuthContext.Provider
        value={{ user: null, isLoggedIn: false, isReady: false, login, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, isReady: true, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
