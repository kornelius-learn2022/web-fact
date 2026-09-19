import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/usersStore";
import { signJWT, hashPassword } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email atau password yang Anda masukkan salah." },
        { status: 401 }
      );
    }

    // Verify password hash
    const inputHash = await hashPassword(password);
    if (inputHash !== user.passwordHash) {
      return NextResponse.json(
        { success: false, message: "Email atau password yang Anda masukkan salah." },
        { status: 401 }
      );
    }

    // Sign JWT token
    const token = await signJWT({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarColor: user.avatarColor,
    });

    return NextResponse.json({
      success: true,
      message: "Login berhasil! Selamat datang kembali.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarColor: user.avatarColor,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat login." },
      { status: 500 }
    );
  }
}
