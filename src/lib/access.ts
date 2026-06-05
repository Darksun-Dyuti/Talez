import { auth } from "@/auth";
import { cookies } from "next/headers";

export async function getAdminAccess() {
  if (!process.env.DATABASE_URL) {
    return { allowed: true, demo: true, session: null };
  }

  try {
    const session = await auth();
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session")?.value;
    
    const isSecretAdmin = 
      !!process.env.ADMIN_SECRET_KEY && 
      adminSession === process.env.ADMIN_SECRET_KEY;

    return {
      allowed: isSecretAdmin || session?.user.role === "ADMIN",
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
