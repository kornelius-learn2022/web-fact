import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET =
  process.env.JWT_SECRET || "mind-maze-super-secret-jwt-key-2026-high-contrast-secure";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Kontributor";
  avatarColor: string;
  [key: string]: any;
}

export async function signJWT(
  payload: JWTPayload,
  expiresIn: string = "7d"
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "_mindmaze_secure_salt_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
