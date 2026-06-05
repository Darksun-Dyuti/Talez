"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { verifyAdminSecret } from "@/app/admin-login/actions";

export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await verifyAdminSecret(formData);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.success) {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <form action={handleSubmit} className="grid gap-4">
      <div className="grid gap-1">
        <label htmlFor="secret" className="text-sm font-medium text-ink">
          Secret Key
        </label>
        <input
          id="secret"
          name="secret"
          type="password"
          required
          autoComplete="off"
          placeholder="Enter the secret key..."
          className="h-11 rounded-xl border border-line bg-surface px-4 text-sm text-ink outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
        />
      </div>
      
      {error && <p className="text-sm text-ember">{error}</p>}
      
      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex h-11 items-center justify-center rounded-xl bg-ink text-sm font-semibold text-paper transition hover:bg-gold disabled:opacity-70 disabled:hover:bg-ink"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Access Dashboard"}
      </button>
    </form>
  );
}
