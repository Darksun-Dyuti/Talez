import { Suspense } from "react";
import { SignInForm } from "@/components/forms/auth-forms";

export const metadata = {
  title: "Sign in"
};

export default function SignInPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-surface px-4 py-16 sm:px-6 lg:px-8">
      <Suspense>
        <SignInForm />
      </Suspense>
    </section>
  );
}
