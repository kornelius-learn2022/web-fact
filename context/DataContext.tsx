"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Article,
  Category,
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
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  // Sync from Cloud Database on mount
  useEffect(() => {
    // 1. First populate from localStorage cache for instant UI
    try {
      const savedArticles = localStorage.getItem("mind_maze_articles");
      const savedCategories = localStorage.getItem("mind_maze_categories");
      if (savedArticles) setArticles(JSON.parse(savedArticles));
      if (savedCategories) setCategories(JSON.parse(savedCategories));
    } catch {
      // ignore
    }

    // 2. Fetch fresh data from Cloud Postgres Database
    async function syncFromCloud() {
      try {
        const [resArt, resCat] = await Promise.all([
          fetch("/api/articles"),
          fetch("/api/categories"),
        ]);

        const dataArt = await resArt.json();
        if (dataArt.success && Array.isArray(dataArt.articles) && dataArt.articles.length > 0) {
          setArticles(dataArt.articles);
          localStorage.setItem("mind_maze_articles", JSON.stringify(dataArt.articles));
        }

        const dataCat = await resCat.json();
        if (dataCat.success && Array.isArray(dataCat.categories) && dataCat.categories.length > 0) {
          setCategories(dataCat.categories);
          localStorage.setItem("mind_maze_categories", JSON.stringify(dataCat.categories));
        }
      } catch (err) {
        console.error("Failed to sync from cloud database, using cache:", err);
      }
    }

    syncFromCloud();
  }, []);

  const persistArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    try {
      localStorage.setItem("mind_maze_articles", JSON.stringify(newArticles));
    } catch {
      // ignore
    }
  };

  const persistCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    try {
      localStorage.setItem("mind_maze_categories", JSON.stringify(newCategories));
    } catch {
      // ignore
    }
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

    // Sync to Cloud Database (Postgres)
    fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article: newArticle }),
    }).catch((e) => console.error("Cloud save failed:", e));

    // Update category count
    const catUpdated = categories.map((c) =>
      c.slug === articleData.categorySlug ? { ...c, count: c.count + 1 } : c
    );
    persistCategories(catUpdated);

    return {
      success: true,
      message: isAdmin
        ? "Artikel berhasil dipublikasikan secara langsung ke Cloud Database! 🚀"
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

    let updatedArticle: Article = target;
    const updated = articles.map((a) => {
      if (a.id === id) {
        updatedArticle = {
          ...a,
          ...updatedData,
          status: isAdmin ? (updatedData.status || a.status) : "pending",
        };
        return updatedArticle;
      }
      return a;
    });

    persistArticles(updated);

    // Sync to Cloud Database (Postgres)
    fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article: updatedArticle }),
    }).catch((e) => console.error("Cloud update failed:", e));

    return {
      success: true,
      message: isAdmin
        ? "Artikel berhasil diperbarui di Cloud Database."
        : "Artikel berhasil diedit dan diajukan ulang untuk verifikasi.",
    };
  };

  // Delete Article
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

    // Sync to Cloud Database (Postgres)
    fetch(`/api/articles/${id}`, {
      method: "DELETE",
    }).catch((e) => console.error("Cloud delete failed:", e));

    return { success: true, message: "Artikel berhasil dihapus dari Cloud Database." };
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

    // Sync to Cloud Database (Postgres)
    fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify", status, feedback }),
    }).catch((e) => console.error("Cloud verify failed:", e));
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

    // Sync to Cloud Database (Postgres)
    fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "toggleHotPick" }),
    }).catch((e) => console.error("Cloud toggle hotpick failed:", e));
  };

  // Add Category (Admin Only)
  const addCategory = (categoryData: Omit<Category, "id" | "count">) => {
    const newCat: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
      count: 0,
    };
    persistCategories([...categories, newCat]);

    // Sync to Cloud Database (Postgres)
    fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: newCat }),
    }).catch((e) => console.error("Cloud category save failed:", e));

    return { success: true, message: "Kategori baru berhasil ditambahkan ke Cloud Database!" };
  };

  // Delete Category (Admin Only)
  const deleteCategory = (id: string) => {
    persistCategories(categories.filter((c) => c.id !== id));

    // Sync to Cloud Database (Postgres)
    fetch(`/api/categories?id=${id}`, {
      method: "DELETE",
    }).catch((e) => console.error("Cloud category delete failed:", e));
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
