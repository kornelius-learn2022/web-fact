import { NextResponse } from "next/server";
import {
  dbGetContactMessages,
  dbUpdateContactMessageStatus,
  dbDeleteContactMessage,
} from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";

async function verifyAdminAuth(request: Request): Promise<boolean> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.split(" ")[1];
  const payload = await verifyJWT(token);
  return Boolean(payload && payload.role === "Admin");
}

export async function GET(request: Request) {
  try {
    const isAuthed = await verifyAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json(
        {
          success: false,
          message: "Akses ditolak: Hanya Admin yang dapat melihat pesan masuk.",
        },
        { status: 403 }
      );
    }

    const messages = await dbGetContactMessages();
    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error in GET /api/admin/messages:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat mengambil pesan." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const isAuthed = await verifyAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json(
        {
          success: false,
          message: "Akses ditolak: Hanya Admin yang dapat memperbarui status pesan.",
        },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { id, status } = body;

    if (!id || (status !== "read" && status !== "unread")) {
      return NextResponse.json(
        { success: false, message: "ID dan status (read/unread) diperlukan." },
        { status: 400 }
      );
    }

    const success = await dbUpdateContactMessageStatus(id, status);
    if (success) {
      return NextResponse.json({
        success: true,
        message: `Status pesan berhasil diperbarui menjadi ${status}.`,
      });
    }

    return NextResponse.json(
      { success: false, message: "Pesan tidak ditemukan." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error in PATCH /api/admin/messages:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const isAuthed = await verifyAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json(
        {
          success: false,
          message: "Akses ditolak: Hanya Admin yang dapat menghapus pesan.",
        },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Parameter id diperlukan." },
        { status: 400 }
      );
    }

    const success = await dbDeleteContactMessage(id);
    if (success) {
      return NextResponse.json({
        success: true,
        message: "Pesan berhasil dihapus.",
      });
    }

    return NextResponse.json(
      { success: false, message: "Gagal menghapus pesan." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/admin/messages:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat menghapus pesan." },
      { status: 500 }
    );
  }
}
