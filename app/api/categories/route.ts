import { NextResponse } from "next/server";
import { dbGetCategories, dbSaveCategory, dbDeleteCategory } from "@/lib/db";
import { Category } from "@/data/mockData";

export async function GET() {
  try {
    const categories = await dbGetCategories();
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const category: Category = body.category;

    if (!category || !category.id || !category.name) {
      return NextResponse.json(
        { success: false, message: "Data kategori tidak lengkap." },
        { status: 400 }
      );
    }

    const saved = await dbSaveCategory(category);
    return NextResponse.json({ success: true, category: saved });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save category" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID kategori diperlukan." },
        { status: 400 }
      );
    }

    await dbDeleteCategory(id);
    return NextResponse.json({ success: true, message: "Kategori berhasil dihapus." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
