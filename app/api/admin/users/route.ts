import { NextResponse } from "next/server";
import { dbGetUsers, dbCreateUser, dbDeleteUser, dbFindUserByEmail } from "@/lib/db";
import { hashPassword, verifyJWT } from "@/lib/jwt";

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
        { success: false, message: "Akses ditolak: Hanya Admin yang dapat melihat daftar pengguna." },
        { status: 403 }
      );
    }

    const users = await dbGetUsers();
    return NextResponse.json({
      success: true,
      users: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        avatarColor: u.avatarColor,
        createdAt: u.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error in GET /api/admin/users:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat mengambil daftar pengguna." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAuthed = await verifyAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak: Hanya Admin yang dapat menambahkan pengguna." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Nama lengkap pengguna wajib diisi." },
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
        { success: false, message: "Password minimal 6 karakter." },
        { status: 400 }
      );
    }

    const existing = await dbFindUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Pengguna dengan email ini sudah terdaftar." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const assignedRole = role === "Admin" ? "Admin" : "Kontributor";

    const newUser = await dbCreateUser({
      name: name.trim(),
      email: email.trim(),
      passwordHash,
      role: assignedRole,
    });

    return NextResponse.json({
      success: true,
      message: `Pengguna ${newUser.name} (${newUser.role}) berhasil ditambahkan ke database! 🎉`,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatarColor: newUser.avatarColor,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in POST /api/admin/users:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat menambahkan pengguna." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const isAuthed = await verifyAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak: Hanya Admin yang dapat menghapus pengguna." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID pengguna wajib disertakan." },
        { status: 400 }
      );
    }

    if (id === "usr-admin-1") {
      return NextResponse.json(
        { success: false, message: "Akun Admin utama tidak boleh dihapus demi keamanan sistem." },
        { status: 400 }
      );
    }

    const success = await dbDeleteUser(id);
    if (!success) {
      return NextResponse.json(
        { success: false, message: "Gagal menghapus pengguna." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pengguna berhasil dihapus dari database.",
    });
  } catch (error) {
    console.error("Error in DELETE /api/admin/users:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat menghapus pengguna." },
      { status: 500 }
    );
  }
}
