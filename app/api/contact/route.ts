import { NextResponse } from "next/server";
import { dbCreateContactMessage } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, phone, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama wajib diisi." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, message: "Email wajib diisi." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, message: "Pesan wajib diisi." },
        { status: 400 }
      );
    }

    const newMessage = await dbCreateContactMessage({
      name,
      email,
      phone: phone || "",
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Pesan Anda berhasil dikirim ke Administrator Mind.Maze!",
      data: newMessage,
    });
  } catch (error: any) {
    console.error("Error in POST /api/contact:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Terjadi kesalahan server saat mengirim pesan.",
      },
      { status: 500 }
    );
  }
}
