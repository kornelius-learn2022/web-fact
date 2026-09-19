import { NextResponse } from "next/server";
import { generateAICrossword } from "@/lib/groqAI";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { category = "Semua Kategori", wordCount } = body;

    const parsedCount = wordCount ? Number(wordCount) : undefined;
    const crossword = await generateAICrossword(category, parsedCount);

    return NextResponse.json({
      success: true,
      crossword,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal menyusun teka-teki silang interaktif.",
      },
      { status: 500 }
    );
  }
}
