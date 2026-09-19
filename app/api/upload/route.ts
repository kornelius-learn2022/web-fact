import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File gambar tidak ditemukan." },
        { status: 400 }
      );
    }

    // Validate image MIME type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Hanya file gambar (JPG, PNG, WEBP, GIF, SVG) yang diperbolehkan." },
        { status: 400 }
      );
    }

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "Ukuran file terlalu besar (maksimal 5MB)." },
        { status: 400 }
      );
    }

    // 1. Production Mode on Vercel: Use Vercel Blob Storage directly
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
      });

      return NextResponse.json({
        success: true,
        url: blob.url,
        provider: "vercel-blob",
        name: file.name,
        size: file.size,
      });
    }

    // 2. Local Development Fallback: Store in public/uploads/
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");
    const safeFilename = `${Date.now()}-${baseName}${ext}`;
    const filePath = path.join(uploadsDir, safeFilename);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${safeFilename}`,
      provider: "local-dev",
      name: file.name,
      size: file.size,
    });
  } catch (error: any) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal mengunggah gambar ke server." },
      { status: 500 }
    );
  }
}
