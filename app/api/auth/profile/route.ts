import { NextResponse } from "next/server";
import { verifyJWT, signJWT } from "@/lib/jwt";
import { updateUserName } from "@/lib/usersStore";

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Token autentikasi tidak ditemukan." },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyJWT(token);

    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Sesi tidak valid atau telah kedaluwarsa. Silakan login kembali." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Nama tidak boleh kosong." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    // Update name in store
    await updateUserName(payload.email, trimmedName);

    // Sign new JWT with updated name
    const newToken = await signJWT({
      ...payload,
      name: trimmedName,
    });

    return NextResponse.json({
      success: true,
      message: "Nama profil berhasil diperbarui! 🎉",
      token: newToken,
      user: {
        id: payload.id,
        name: trimmedName,
        email: payload.email,
        role: payload.role,
        avatarColor: payload.avatarColor,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat memperbarui profil." },
      { status: 500 }
    );
  }
}
