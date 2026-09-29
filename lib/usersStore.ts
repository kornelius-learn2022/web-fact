import { hashPassword } from "./jwt";
import {
  DbUser,
  dbGetUsers,
  dbFindUserByEmail,
  dbCreateUser,
  dbDeleteUser,
  dbUpdateUserName,
} from "./db";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "Admin" | "Kontributor";
  avatarColor: string;
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const user = await dbFindUserByEmail(email);
  return user;
}

export async function createUser(
  name: string,
  email: string,
  plainPassword: string,
  role: "Admin" | "Kontributor" = "Kontributor"
): Promise<StoredUser> {
  const passwordHash = await hashPassword(plainPassword);
  return dbCreateUser({
    name,
    email,
    passwordHash,
    role,
  });
}

export async function updateUserName(email: string, newName: string): Promise<StoredUser | null> {
  return dbUpdateUserName(email, newName);
}

export { dbGetUsers, dbDeleteUser };
