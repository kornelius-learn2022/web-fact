import { NextResponse } from "next/server";
import { dbGetArticles, dbSaveArticle } from "@/lib/db";
import { Article } from "@/data/mockData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const articles = await dbGetArticles();
    return NextResponse.json(
      { success: true, articles },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const article: Article = body.article;

    if (!article || !article.id || !article.title) {
      return NextResponse.json(
        { success: false, message: "Data artikel tidak lengkap." },
        { status: 400 }
      );
    }

    const saved = await dbSaveArticle(article);
    return NextResponse.json(
      { success: true, article: saved },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("API POST /api/articles error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save article" },
      { status: 500 }
    );
  }
}
