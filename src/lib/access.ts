import { auth } from "@/auth";

export async function getAdminAccess() {
  try {
    const session = await auth();

    return {
      allowed: session?.user?.role === "ADMIN",
      demo: false,
      session
    };
  } catch {
    return { allowed: false, demo: false, session: null };
  }
}

export async function getReaderSession() {
  try {
    return await auth();
  } catch {
    return null;
  }
}
