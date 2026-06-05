import { SignUpForm } from "@/components/forms/auth-forms";

export const metadata = {
  title: "Create account"
};

export default function SignUpPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-surface px-4 py-16 sm:px-6 lg:px-8">
      <SignUpForm />
    </section>
  );
}
