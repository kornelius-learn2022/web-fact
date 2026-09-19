"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Article,
  Category,
  Author,
  INITIAL_ARTICLES,
  INITIAL_CATEGORIES,
} from "@/data/mockData";
import { User } from "./AuthContext";

interface DataContextType {
  articles: Article[];
  categories: Category[];
  addArticle: (
    articleData: Omit<Article, "id" | "slug" | "status" | "createdAt" | "reactions" | "author">,
    user: User
  ) => { success: boolean; message: string; article?: Article };
  updateArticle: (
    id: string,
    updatedData: Partial<Article>,
    user: User
  ) => { success: boolean; message: string };
  deleteArticle: (
    id: string,
    user: User
  ) => { success: boolean; message: string };
  verifyArticle: (
    id: string,
    status: "published" | "rejected",
    feedback?: string
  ) => void;
  toggleHotPick: (id: string) => void;
  addCategory: (
    categoryData: Omit<Category, "id" | "count">
  ) => { success: boolean; message: string };
  deleteCategory: (id: string) => void;
  getPublishedArticles: () => Article[];
  getPendingArticles: () => Article[];
  getArticlesByAuthor: (email: string) => Article[];
  resetToDefault: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage or initialize with INITIAL data
  useEffect(() => {
    try {
      const savedArticles = localStorage.getItem("mind_maze_articles");
      const savedCategories = localStorage.getItem("mind_maze_categories");

      if (savedArticles) {
        setArticles(JSON.parse(savedArticles));
      } else {
        setArticles(INITIAL_ARTICLES);
        localStorage.setItem(
          "mind_maze_articles",
          JSON.stringify(INITIAL_ARTICLES)
        );
      }

      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      } else {
        setCategories(INITIAL_CATEGORIES);
        localStorage.setItem(
          "mind_maze_categories",
          JSON.stringify(INITIAL_CATEGORIES)
        );
      }
    } catch {
      setArticles(INITIAL_ARTICLES);
      setCategories(INITIAL_CATEGORIES);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when updated
  const persistArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem("mind_maze_articles", JSON.stringify(newArticles));
  };

  const persistCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem(
      "mind_maze_categories",
      JSON.stringify(newCategories)
    );
  };

  // Add Article (RBAC: Admin -> published, Kontributor -> pending)
  const addArticle = (
    articleData: Omit<Article, "id" | "slug" | "status" | "createdAt" | "reactions" | "author">,
    user: User
  ) => {
    const slug = articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const isAdmin = user.role === "Admin";
    const newArticle: Article = {
      ...articleData,
      id: `art-${Date.now()}`,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      status: isAdmin ? "published" : "pending",
      isHotPick: isAdmin ? Boolean(articleData.isHotPick) : false,
      createdAt: new Date().toISOString().split("T")[0],
      reactions: { mindBlown: 0, justLearned: 0, neutral: 0 },
      author: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatarColor: user.avatarColor,
      },
    };

    const updated = [newArticle, ...articles];
    persistArticles(updated);

    // Update category count
    const catUpdated = categories.map((c) =>
      c.slug === articleData.categorySlug ? { ...c, count: c.count + 1 } : c
    );
    persistCategories(catUpdated);

    return {
      success: true,
      message: isAdmin
        ? "Artikel berhasil dipublikasikan secara langsung! 🚀"
        : "Artikel berhasil dikirim! Menunggu verifikasi dari Admin sebelum tayang. ⏳",
      article: newArticle,
    };
  };

  // Update Article (RBAC: Admin -> can edit all, Kontributor -> only own)
  const updateArticle = (
    id: string,
    updatedData: Partial<Article>,
    user: User
  ) => {
    const target = articles.find((a) => a.id === id);
    if (!target) {
      return { success: false, message: "Artikel tidak ditemukan." };
    }

    const isAdmin = user.role === "Admin";
    const isOwner = target.author.email === user.email;

    if (!isAdmin && !isOwner) {
      return {
        success: false,
        message: "Akses Ditolak: Anda hanya dapat mengedit artikel buatan sendiri.",
      };
    }

    const updated = articles.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          ...updatedData,
          // If edited by contributor, re-verify or keep pending
          status: isAdmin ? (updatedData.status || a.status) : "pending",
        };
      }
      return a;
    });

    persistArticles(updated);
    return {
      success: true,
      message: isAdmin
        ? "Artikel berhasil diperbarui oleh Admin."
        : "Artikel berhasil diedit dan diajukan ulang untuk verifikasi.",
    };
  };

  // Delete Article (RBAC: Admin can delete any, Kontributor can only delete own)
  const deleteArticle = (id: string, user: User) => {
    const target = articles.find((a) => a.id === id);
    if (!target) {
      return { success: false, message: "Artikel tidak ditemukan." };
    }

    const isAdmin = user.role === "Admin";
    const isOwner = target.author.email === user.email;

    if (!isAdmin && !isOwner) {
      return {
        success: false,
        message: "Akses Ditolak: Hanya Admin yang dapat menghapus artikel orang lain.",
      };
    }

    const updated = articles.filter((a) => a.id !== id);
    persistArticles(updated);
    return { success: true, message: "Artikel berhasil dihapus." };
  };

  // Verify Article (Admin Only)
  const verifyArticle = (
    id: string,
    status: "published" | "rejected",
    feedback?: string
  ) => {
    const updated = articles.map((a) => {
      if (a.id === id) {
        return { ...a, status, adminFeedback: feedback };
      }
      return a;
    });
    persistArticles(updated);
  };

  // Toggle Hot Pick (Admin Only)
  const toggleHotPick = (id: string) => {
    const updated = articles.map((a) => {
      if (a.id === id) {
        return { ...a, isHotPick: !a.isHotPick };
      }
      return a;
    });
    persistArticles(updated);
  };

  // Add Category (Admin Only)
  const addCategory = (categoryData: Omit<Category, "id" | "count">) => {
    const newCat: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
      count: 0,
    };
    persistCategories([...categories, newCat]);
    return { success: true, message: "Kategori baru berhasil ditambahkan!" };
  };

  // Delete Category (Admin Only)
  const deleteCategory = (id: string) => {
    persistCategories(categories.filter((c) => c.id !== id));
  };

  // Helper selectors
  const getPublishedArticles = () =>
    articles.filter((a) => a.status === "published");

  const getPendingArticles = () =>
    articles.filter((a) => a.status === "pending");

  const getArticlesByAuthor = (email: string) =>
    articles.filter((a) => a.author.email === email);

  const resetToDefault = () => {
    persistArticles(INITIAL_ARTICLES);
    persistCategories(INITIAL_CATEGORIES);
  };

  return (
    <DataContext.Provider
      value={{
        articles,
        categories,
        addArticle,
        updateArticle,
        deleteArticle,
        verifyArticle,
        toggleHotPick,
        addCategory,
        deleteCategory,
        getPublishedArticles,
        getPendingArticles,
        getArticlesByAuthor,
        resetToDefault,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
