import { neon } from "@neondatabase/serverless";
import { Article, Category, INITIAL_ARTICLES, INITIAL_CATEGORIES } from "@/data/mockData";
import { hashPassword } from "./jwt";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.STORAGE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

// Helper to get neon client if configured
function getSql() {
  if (!connectionString) return null;
  return neon(connectionString);
}

export interface DbUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "Admin" | "Kontributor";
  avatarColor: string;
  createdAt: string;
}

// In-memory fallback stores for offline/local development without DB URL
let memoryArticles: Article[] = [...INITIAL_ARTICLES];
let memoryCategories: Category[] = [...INITIAL_CATEGORIES];
let memoryUsers: DbUser[] = [];
let isDbInitialized = false;

async function ensureDefaultMemoryUsers() {
  if (memoryUsers.length === 0) {
    const adminHash = await hashPassword("admin123");
    memoryUsers = [
      {
        id: "usr-admin-1",
        name: "Tim Redaksi Mind.Maze",
        email: "admin@mindmaze.com",
        passwordHash: adminHash,
        role: "Admin",
        avatarColor: "bg-neon-fuchsia",
        createdAt: "2026-09-29T00:00:00.000Z",
      },
    ];
  }
}

/**
 * Initializes database tables, creates users table, cleans dummy data,
 * and seeds initial articles, categories, and admin account.
 */
export async function initDb() {
  await ensureDefaultMemoryUsers();
  const sql = getSql();
  if (!sql) return;
  if (isDbInitialized) return;

  try {
    // 1. Articles table
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE,
        title TEXT NOT NULL,
        category_slug TEXT NOT NULL,
        is_hot_pick BOOLEAN DEFAULT FALSE,
        status TEXT DEFAULT 'published',
        author_email TEXT NOT NULL,
        created_at TEXT NOT NULL,
        data JSONB NOT NULL
      );
    `;

    // 2. Categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE,
        name TEXT NOT NULL,
        data JSONB NOT NULL
      );
    `;

    // 3. Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'Kontributor',
        avatar_color TEXT NOT NULL DEFAULT 'bg-cyber-lime',
        created_at TEXT NOT NULL
      );
    `;

    // Clean out legacy mock articles (id like 'art-%')
    await sql`DELETE FROM articles WHERE id LIKE 'art-%';`;

    // Upsert all 16 initial articles so data & sources are always up to date
    for (const a of INITIAL_ARTICLES) {
      await sql`
        INSERT INTO articles (id, slug, title, category_slug, is_hot_pick, status, author_email, created_at, data)
        VALUES (
          ${a.id},
          ${a.slug},
          ${a.title},
          ${a.categorySlug},
          ${a.isHotPick},
          ${a.status},
          ${a.author.email},
          ${a.createdAt},
          ${JSON.stringify(a)}
        )
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          category_slug = EXCLUDED.category_slug,
          author_email = EXCLUDED.author_email,
          data = EXCLUDED.data;
      `;
    }

    // Clean out legacy dummy categories
    await sql`DELETE FROM categories WHERE id IN ('cat-tech', 'cat-science', 'cat-psychology', 'cat-history', 'technology', 'science', 'psychology', 'history');`;

    // Upsert all 4 initial categories
    for (const c of INITIAL_CATEGORIES) {
      await sql`
        INSERT INTO categories (id, slug, name, data)
        VALUES (
          ${c.id},
          ${c.slug},
          ${c.name},
          ${JSON.stringify(c)}
        )
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          name = EXCLUDED.name,
          data = EXCLUDED.data;
      `;
    }

    // Clean out legacy dummy users
    await sql`DELETE FROM users WHERE email IN ('farhan@mindmaze.com', 'nadia@mindmaze.com');`;

    // Ensure Admin user exists
    const adminCheck = await sql`SELECT id FROM users WHERE email = 'admin@mindmaze.com';`;
    if (adminCheck.length === 0) {
      const adminPassHash = await hashPassword("admin123");
      await sql`
        INSERT INTO users (id, name, email, password_hash, role, avatar_color, created_at)
        VALUES (
          'usr-admin-1',
          'Tim Redaksi Mind.Maze',
          'admin@mindmaze.com',
          ${adminPassHash},
          'Admin',
          'bg-neon-fuchsia',
          ${new Date().toISOString()}
        )
        ON CONFLICT (email) DO NOTHING;
      `;
    }

    isDbInitialized = true;
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// ----------------- ARTICLES METHODS -----------------

export async function dbGetArticles(): Promise<Article[]> {
  const sql = getSql();
  if (!sql) {
    return memoryArticles;
  }

  await initDb();
  try {
    const rows = await sql`SELECT data FROM articles ORDER BY created_at DESC;`;
    return rows.map((r: any) => r.data as Article);
  } catch (error) {
    console.error("Error fetching articles from Postgres, falling back to memory:", error);
    return memoryArticles;
  }
}

export async function dbSaveArticle(article: Article): Promise<Article> {
  const sql = getSql();
  if (!sql) {
    memoryArticles = [article, ...memoryArticles.filter((a) => a.id !== article.id)];
    return article;
  }

  await initDb();
  await sql`
    INSERT INTO articles (id, slug, title, category_slug, is_hot_pick, status, author_email, created_at, data)
    VALUES (
      ${article.id},
      ${article.slug},
      ${article.title},
      ${article.categorySlug},
      ${article.isHotPick},
      ${article.status},
      ${article.author.email},
      ${article.createdAt},
      ${JSON.stringify(article)}
    )
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      title = EXCLUDED.title,
      category_slug = EXCLUDED.category_slug,
      is_hot_pick = EXCLUDED.is_hot_pick,
      status = EXCLUDED.status,
      author_email = EXCLUDED.author_email,
      data = EXCLUDED.data;
  `;

  return article;
}

export async function dbDeleteArticle(id: string): Promise<boolean> {
  const sql = getSql();
  if (!sql) {
    memoryArticles = memoryArticles.filter((a) => a.id !== id);
    return true;
  }

  await initDb();
  await sql`DELETE FROM articles WHERE id = ${id};`;
  return true;
}

export async function dbToggleHotPick(id: string): Promise<boolean> {
  const sql = getSql();
  if (!sql) {
    memoryArticles = memoryArticles.map((a) =>
      a.id === id ? { ...a, isHotPick: !a.isHotPick } : a
    );
    return true;
  }

  await initDb();
  const rows = await sql`SELECT data FROM articles WHERE id = ${id};`;
  if (rows.length === 0) return false;

  const current: Article = rows[0].data;
  const updated: Article = { ...current, isHotPick: !current.isHotPick };

  await sql`
    UPDATE articles
    SET is_hot_pick = ${updated.isHotPick}, data = ${JSON.stringify(updated)}
    WHERE id = ${id};
  `;
  return true;
}

export async function dbVerifyArticle(
  id: string,
  status: "published" | "rejected",
  feedback?: string
): Promise<boolean> {
  const sql = getSql();
  if (!sql) {
    memoryArticles = memoryArticles.map((a) =>
      a.id === id ? { ...a, status, adminFeedback: feedback } : a
    );
    return true;
  }

  await initDb();
  const rows = await sql`SELECT data FROM articles WHERE id = ${id};`;
  if (rows.length === 0) return false;

  const current: Article = rows[0].data;
  const updated: Article = { ...current, status, adminFeedback: feedback };

  await sql`
    UPDATE articles
    SET status = ${status}, data = ${JSON.stringify(updated)}
    WHERE id = ${id};
  `;
  return true;
}

// ----------------- CATEGORIES METHODS -----------------

export async function dbGetCategories(): Promise<Category[]> {
  const sql = getSql();
  if (!sql) {
    return memoryCategories;
  }

  await initDb();
  try {
    const rows = await sql`SELECT data FROM categories;`;
    if (rows.length === 0) return memoryCategories;
    return rows.map((r: any) => r.data as Category);
  } catch (error) {
    console.error("Error fetching categories from Postgres:", error);
    return memoryCategories;
  }
}

export async function dbSaveCategory(category: Category): Promise<Category> {
  const sql = getSql();
  if (!sql) {
    memoryCategories.push(category);
    return category;
  }

  await initDb();
  await sql`
    INSERT INTO categories (id, slug, name, data)
    VALUES (${category.id}, ${category.slug}, ${category.name}, ${JSON.stringify(category)})
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      name = EXCLUDED.name,
      data = EXCLUDED.data;
  `;

  return category;
}

export async function dbDeleteCategory(id: string): Promise<boolean> {
  const sql = getSql();
  if (!sql) {
    memoryCategories = memoryCategories.filter((c) => c.id !== id);
    return true;
  }

  await initDb();
  await sql`DELETE FROM categories WHERE id = ${id};`;
  return true;
}

// ----------------- USERS METHODS -----------------

export async function dbGetUsers(): Promise<DbUser[]> {
  const sql = getSql();
  if (!sql) {
    await ensureDefaultMemoryUsers();
    return memoryUsers;
  }

  await initDb();
  try {
    const rows = await sql`
      SELECT id, name, email, password_hash, role, avatar_color, created_at 
      FROM users 
      ORDER BY created_at ASC;
    `;
    return rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      passwordHash: r.password_hash,
      role: r.role,
      avatarColor: r.avatar_color,
      createdAt: r.created_at,
    }));
  } catch (error) {
    console.error("Error fetching users from Postgres:", error);
    await ensureDefaultMemoryUsers();
    return memoryUsers;
  }
}

export async function dbFindUserByEmail(email: string): Promise<DbUser | null> {
  const sql = getSql();
  if (!sql) {
    await ensureDefaultMemoryUsers();
    const found = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return found || null;
  }

  await initDb();
  try {
    const rows = await sql`
      SELECT id, name, email, password_hash, role, avatar_color, created_at
      FROM users
      WHERE LOWER(email) = LOWER(${email.trim()})
      LIMIT 1;
    `;
    if (rows.length === 0) return null;
    const r = rows[0];
    return {
      id: r.id,
      name: r.name,
      email: r.email,
      passwordHash: r.password_hash,
      role: r.role,
      avatarColor: r.avatar_color,
      createdAt: r.created_at,
    };
  } catch (error) {
    console.error("Error finding user by email in Postgres:", error);
    await ensureDefaultMemoryUsers();
    const found = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return found || null;
  }
}

export async function dbCreateUser(user: {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role?: "Admin" | "Kontributor";
  avatarColor?: string;
}): Promise<DbUser> {
  const role = user.role || "Kontributor";
  const newUser: DbUser = {
    id: user.id || `usr-${Date.now()}`,
    name: user.name.trim(),
    email: user.email.toLowerCase().trim(),
    passwordHash: user.passwordHash,
    role,
    avatarColor: user.avatarColor || (role === "Admin" ? "bg-neon-fuchsia" : "bg-cyber-lime"),
    createdAt: new Date().toISOString(),
  };

  const sql = getSql();
  if (!sql) {
    await ensureDefaultMemoryUsers();
    memoryUsers.push(newUser);
    return newUser;
  }

  await initDb();
  await sql`
    INSERT INTO users (id, name, email, password_hash, role, avatar_color, created_at)
    VALUES (
      ${newUser.id},
      ${newUser.name},
      ${newUser.email},
      ${newUser.passwordHash},
      ${newUser.role},
      ${newUser.avatarColor},
      ${newUser.createdAt}
    )
    ON CONFLICT (email) DO UPDATE SET
      name = EXCLUDED.name,
      password_hash = EXCLUDED.password_hash,
      role = EXCLUDED.role,
      avatar_color = EXCLUDED.avatar_color;
  `;

  return newUser;
}

export async function dbDeleteUser(id: string): Promise<boolean> {
  // Prevent deleting default admin
  if (id === "usr-admin-1") return false;

  const sql = getSql();
  if (!sql) {
    await ensureDefaultMemoryUsers();
    memoryUsers = memoryUsers.filter((u) => u.id !== id);
    return true;
  }

  await initDb();
  await sql`DELETE FROM users WHERE id = ${id} AND email != 'admin@mindmaze.com';`;
  return true;
}

export async function dbUpdateUserName(email: string, newName: string): Promise<DbUser | null> {
  const sql = getSql();
  if (!sql) {
    await ensureDefaultMemoryUsers();
    const u = memoryUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (!u) return null;
    u.name = newName;
    return u;
  }

  await initDb();
  await sql`
    UPDATE users
    SET name = ${newName}
    WHERE LOWER(email) = LOWER(${email.trim()});
  `;
  return dbFindUserByEmail(email);
}
