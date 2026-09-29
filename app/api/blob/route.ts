import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const blobUrl = searchParams.get("url");

    if (!blobUrl) {
      return new NextResponse("Missing url parameter", { status: 400 });
    }

    const headers: Record<string, string> = {};
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`;
    }

    const res = await fetch(blobUrl, { headers });

    if (!res.ok) {
      // If fetching with auth fails, try fetching raw
      const rawRes = await fetch(blobUrl);
      if (!rawRes.ok) {
        return new NextResponse("Failed to fetch private blob image", { status: res.status });
      }
      const rawType = rawRes.headers.get("content-type") || "image/jpeg";
      const rawBuffer = await rawRes.arrayBuffer();
      return new NextResponse(rawBuffer, {
        headers: {
          "Content-Type": rawType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Blob proxy error:", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}
