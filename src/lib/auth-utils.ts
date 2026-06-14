import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/sign-in");
  }
  return session;
}

export async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

export async function requireUser() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
}
