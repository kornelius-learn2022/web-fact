import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/usersStore";
import { signJWT } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Nama lengkap wajib diisi." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password wajib diisi (minimal 6 karakter)." },
        { status: 400 }
      );
    }

    // Check if email already registered
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email sudah terdaftar. Silakan gunakan email lain atau login." },
        { status: 409 }
      );
    }

    // Create user (default role: Kontributor)
    const newUser = await createUser(name.trim(), email.trim(), password, "Kontributor");

    // Generate JWT token
    const token = await signJWT({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatarColor: newUser.avatarColor,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pendaftaran berhasil! Selamat datang di Mind.Maze.",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatarColor: newUser.avatarColor,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat pendaftaran." },
      { status: 500 }
    );
  }
}
