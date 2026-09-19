import { hashPassword } from "./jwt";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "Admin" | "Kontributor";
  avatarColor: string;
}

// In-memory server store with initial default accounts
let usersStore: StoredUser[] = [];

// Helper to ensure default users are populated
async function ensureDefaultUsers() {
  if (usersStore.length === 0) {
    const adminHash = await hashPassword("admin123");
    const farhanHash = await hashPassword("farhan123");
    const nadiaHash = await hashPassword("nadia123");

    usersStore = [
      {
        id: "usr-admin-1",
        name: "Tim Redaksi Mind.Maze",
        email: "admin@mindmaze.com",
        passwordHash: adminHash,
        role: "Admin",
        avatarColor: "bg-neon-fuchsia",
      },
      {
        id: "usr-contributor-1",
        name: "dr. Farhan Malik",
        email: "farhan@mindmaze.com",
        passwordHash: farhanHash,
        role: "Kontributor",
        avatarColor: "bg-electric-indigo",
      },
      {
        id: "usr-contributor-2",
        name: "Nadia Putri",
        email: "nadia@mindmaze.com",
        passwordHash: nadiaHash,
        role: "Kontributor",
        avatarColor: "bg-cyber-lime",
      },
    ];
  }
}

export async function findUserByEmail(email: string): Promise<StoredUser | undefined> {
  await ensureDefaultUsers();
  return usersStore.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function createUser(
  name: string,
  email: string,
  plainPassword: string,
  role: "Admin" | "Kontributor" = "Kontributor"
): Promise<StoredUser> {
  await ensureDefaultUsers();
  const passwordHash = await hashPassword(plainPassword);

  const newUser: StoredUser = {
    id: `usr-${Date.now()}`,
    name,
    email: email.toLowerCase().trim(),
    passwordHash,
    role,
    avatarColor: role === "Admin" ? "bg-neon-fuchsia" : "bg-cyber-lime",
  };

  usersStore.push(newUser);
  return newUser;
}

export async function updateUserName(email: string, newName: string): Promise<StoredUser | null> {
  await ensureDefaultUsers();
  const userIndex = usersStore.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (userIndex === -1) return null;

  usersStore[userIndex].name = newName;
  return usersStore[userIndex];
}
