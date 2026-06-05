"use server";

import { cookies } from "next/headers";

export async function verifyAdminSecret(formData: FormData) {
  const secret = formData.get("secret")?.toString();
  
  if (!secret) {
    return { error: "Secret key is required." };
  }

  if (secret === process.env.ADMIN_SECRET_KEY) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return { success: true };
  }

  return { error: "Invalid secret key." };
}
