"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id?: string;
  name: string;
  email: string;
  role: "Kontributor" | "Admin";
  avatarColor: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  updateName: (
    newName: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("mind_maze_jwt_token");
      const savedUser = localStorage.getItem("mind_maze_user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem("mind_maze_jwt_token");
      localStorage.removeItem("mind_maze_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login with Email & Password via JWT API
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Email atau password salah.",
        };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("mind_maze_jwt_token", data.token);
      localStorage.setItem("mind_maze_user", JSON.stringify(data.user));

      return { success: true, message: data.message };
    } catch {
      return {
        success: false,
        message: "Gagal terhubung ke server autentikasi.",
      };
    }
  };

  // Register with Name, Email & Password via JWT API
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Gagal melakukan registrasi.",
        };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("mind_maze_jwt_token", data.token);
      localStorage.setItem("mind_maze_user", JSON.stringify(data.user));

      return { success: true, message: data.message };
    } catch {
      return {
        success: false,
        message: "Gagal terhubung ke server autentikasi.",
      };
    }
  };

  // Edit Name via JWT Profile API
  const updateName = async (
    newName: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!token) {
      return { success: false, message: "Sesi tidak ditemukan. Silakan login." };
    }

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Gagal memperbarui nama profil.",
        };
      }

      // Update state & localStorage with refreshed JWT and user data
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("mind_maze_jwt_token", data.token);
      localStorage.setItem("mind_maze_user", JSON.stringify(data.user));

      return { success: true, message: data.message };
    } catch {
      return {
        success: false,
        message: "Gagal menghubungi server untuk memperbarui profil.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mind_maze_jwt_token");
    localStorage.removeItem("mind_maze_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        updateName,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
