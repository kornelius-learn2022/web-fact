import { NextResponse } from "next/server";
import { dbSaveArticle, dbDeleteArticle, dbToggleHotPick, dbVerifyArticle } from "@/lib/db";
import { Article } from "@/data/mockData";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check specific actions: toggleHotPick or verify
    if (body.action === "toggleHotPick") {
      await dbToggleHotPick(id);
      return NextResponse.json({ success: true, message: "HotPick toggled" });
    }

    if (body.action === "verify") {
      await dbVerifyArticle(id, body.status, body.feedback);
      return NextResponse.json({ success: true, message: "Article verified" });
    }

    // Default: full update
    const article: Article = body.article;
    if (article) {
      await dbSaveArticle(article);
      return NextResponse.json({ success: true, article });
    }

    return NextResponse.json(
      { success: false, message: "No action or article provided" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbDeleteArticle(id);
    return NextResponse.json({ success: true, message: "Article deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete article" },
      { status: 500 }
    );
  }
}
