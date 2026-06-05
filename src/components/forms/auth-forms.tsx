"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, UserPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl
    });
    setLoading(false);
    if (result?.error) {
      setMessage("Invalid email or password.");
      return;
    }
    router.push(callbackUrl);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-line bg-surface p-6 shadow-soft">
      <div className="mb-6 flex items-center gap-3">
        <Image src="/brand/talez-logo-256.png" alt="Talez" width={46} height={46} className="rounded-xl border border-line bg-ink" />
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ink">Welcome back</h1>
          <p className="text-sm text-muted">Continue reading with Talez.</p>
        </div>
      </div>

      <form onSubmit={submit} className="grid gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="h-12 rounded-xl border border-line bg-paper px-4 text-sm outline-none focus:border-gold"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="h-12 rounded-xl border border-line bg-paper px-4 text-sm outline-none focus:border-gold"
        />
        <button type="submit" disabled={loading} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-sm font-semibold text-paper">
          <Mail className="h-4 w-4" />
          {loading ? "Signing in" : "Sign in"}
        </button>
      </form>

      <div className="my-5 grid gap-2">
        <button type="button" onClick={() => signIn("google", { callbackUrl })} className="h-11 rounded-xl border border-line bg-paper text-sm font-semibold text-ink">
          Continue with Google
        </button>

      </div>

      {message ? <p className="text-sm text-red-600">{message}</p> : null}
      <p className="mt-4 text-sm text-muted">
        New here?{" "}
        <Link href="/sign-up" className="font-semibold text-ember">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.message ?? "Unable to create account.");
      return;
    }
    await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-line bg-surface p-6 shadow-soft">
      <div className="mb-6 flex items-center gap-3">
        <Image src="/brand/talez-logo-256.png" alt="Talez" width={46} height={46} className="rounded-xl border border-line bg-ink" />
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ink">Join Talez</h1>
          <p className="text-sm text-muted">Bookmarks, history, comments, and memberships.</p>
        </div>
      </div>
      <form onSubmit={submit} className="grid gap-3">
        {[
          ["name", "Name", "text"],
          ["username", "Username", "text"],
          ["email", "Email", "email"],
          ["password", "Password", "password"]
        ].map(([key, label, type]) => (
          <input
            key={key}
            type={type}
            required
            value={form[key as keyof typeof form]}
            onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
            placeholder={label}
            className="h-12 rounded-xl border border-line bg-paper px-4 text-sm outline-none focus:border-gold"
          />
        ))}
        <button type="submit" disabled={loading} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-sm font-semibold text-paper">
          <UserPlus className="h-4 w-4" />
          {loading ? "Creating account" : "Create account"}
        </button>
      </form>
      {message ? <p className="mt-4 text-sm text-red-600">{message}</p> : null}
      <p className="mt-4 text-sm text-muted">
        Already registered?{" "}
        <Link href="/sign-in" className="font-semibold text-ember">
          Sign in
        </Link>
      </p>
    </div>
  );
}
