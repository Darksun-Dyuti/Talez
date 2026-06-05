import { redirect } from "next/navigation";
import { getAdminAccess } from "@/lib/access";
import AdminLoginForm from "@/components/forms/admin-login-form";

export default async function AdminLoginPage() {
  const access = await getAdminAccess();
  
  if (access.allowed) {
    redirect("/admin");
  }

  return (
    <section className="mx-auto max-w-md px-4 py-32 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-line bg-paper p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-semibold text-ink text-center">Admin Access</h1>
        <p className="mt-2 text-muted text-center text-sm">Enter the secret key to access the dashboard.</p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </section>
  );
}
