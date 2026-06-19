"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { forgotPasswordAction } from "@/features/auth/actions/auth.actions";
import { AuthStepIndicator } from "@/features/auth/components/auth-step-indicator";
import { AuthCenteredCard } from "@/features/auth/components/auth-layout-parts";
import { AuthPageLayout } from "@/features/auth/components/auth-page-layout";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleNextStep() {
    setError(null);
    setMessage(null);
    setLoading(true);

    const formData = new FormData();
    formData.set("email", email);
    const result = await forgotPasswordAction(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setMessage(result.message);
    router.push("/verify");
  }

  return (
    <AuthPageLayout backHref="/login" backLabel="Back" mainClassName="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen relative z-10 pt-24">
      <AuthCenteredCard>
        <AuthStepIndicator currentStep={1} />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Enter your email and we&apos;ll send you a verification code.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 512 512">
                <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64z" />
              </svg>
            </div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="py-3.5 pl-11 pr-4 placeholder-gray-500"
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {message ? <p className="text-sm text-green-400">{message}</p> : null}

          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled={loading}
            onClick={handleNextStep}
            className="primary-btn w-full py-3.5"
          >
            {loading ? "Sending..." : "Next Step"}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Remember password?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
            Login
          </Link>
        </p>
      </AuthCenteredCard>
    </AuthPageLayout>
  );
}
