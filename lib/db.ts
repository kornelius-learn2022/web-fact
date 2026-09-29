import { neon } from "@neondatabase/serverless";
import { Article, Category, INITIAL_ARTICLES, INITIAL_CATEGORIES } from "@/data/mockData";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

// Helper to get neon client if configured
function getSql() {
  if (!connectionString) return null;
  return neon(connectionString);
}

// In-memory fallback store for offline/local development without DB URL
let memoryArticles: Article[] = [...INITIAL_ARTICLES];
let memoryCategories: Category[] = [...INITIAL_CATEGORIES];
let isDbInitialized = false;

/**
 * Initializes database tables and seeds initial data if empty.
 */
export async function initDb() {
  const sql = getSql();
  if (!sql) return;
  if (isDbInitialized) return;

  try {
    // Create articles table
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

    // Create categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE,
        name TEXT NOT NULL,
        data JSONB NOT NULL
      );
    `;

    // Check if articles need seeding
    const articleCountRes = await sql`SELECT count(*)::int as count FROM articles;`;
    const count = articleCountRes[0]?.count ?? 0;

    if (count === 0) {
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
          ON CONFLICT (id) DO NOTHING;
        `;
      }
    }

    // Check if categories need seeding
    const catCountRes = await sql`SELECT count(*)::int as count FROM categories;`;
    if ((catCountRes[0]?.count ?? 0) === 0) {
      for (const c of INITIAL_CATEGORIES) {
        await sql`
          INSERT INTO categories (id, slug, name, data)
          VALUES (
            ${c.id},
            ${c.slug},
            ${c.name},
            ${JSON.stringify(c)}
          )
          ON CONFLICT (id) DO NOTHING;
        `;
      }
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
