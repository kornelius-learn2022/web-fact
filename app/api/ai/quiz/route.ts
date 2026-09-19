import { NextResponse } from "next/server";
import { generateAIQuiz } from "@/lib/groqAI";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { category = "Semua Kategori", count } = body;

    const parsedCount = count ? Number(count) : undefined;
    const quiz = await generateAIQuiz(category, parsedCount);

    return NextResponse.json({
      success: true,
      quiz,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal menyusun kuis trivia interaktif.",
      },
      { status: 500 }
    );
  }
}
