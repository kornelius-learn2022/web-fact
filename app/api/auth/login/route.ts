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

    // Check Approval Status
    if (user.status === "pending") {
      return NextResponse.json(
        {
          success: false,
          isPending: true,
          message:
            "Akun Anda sedang dalam antrean verifikasi dan persetujuan oleh Administrator. Silakan tunggu hingga disetujui.",
        },
        { status: 403 }
      );
    }

    if (user.status === "rejected") {
      return NextResponse.json(
        {
          success: false,
          message: "Pendaftaran akun Anda ditolak oleh Administrator.",
        },
        { status: 403 }
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

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil! Selamat datang kembali.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarColor: user.avatarColor,
        status: user.status,
      },
    });

    // Set auth cookies for session convenience (Requirement 12)
    response.cookies.set("mind_maze_token", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    response.cookies.set(
      "mind_maze_user",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarColor: user.avatarColor,
      }),
      {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat login." },
      { status: 500 }
    );
  }
}
