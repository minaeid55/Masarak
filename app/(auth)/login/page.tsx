"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { loginBranding } from "@/features/auth/constants/auth-content";
import {
  AuthBrandingPanel,
  AuthFormCard,
  AuthFormHeader,
  AuthMobileLogo,
} from "@/features/auth/components/auth-layout-parts";
import { AuthInputField, PasswordField } from "@/features/auth/components/auth-fields";
import { AuthPageLayout } from "@/features/auth/components/auth-page-layout";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/find-jobs");
    router.refresh();
  }

  return (
    <AuthPageLayout>
      <AuthBrandingPanel content={loginBranding} />

      <AuthFormCard>
        <AuthMobileLogo />

        <AuthFormHeader
          title="Welcome Back"
          description={
            <>
              Don&apos;t have an account yet?{" "}
              <Link
                href="/signup"
                className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
              >
                Sign up
              </Link>
            </>
          }
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInputField
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            required
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
              </svg>
            }
          />

          <PasswordField
            id="password"
            name="password"
            autoComplete="current-password"
            required
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Checkbox id="remember-me" name="remember-me" />
              <Label htmlFor="remember-me" className="text-gray-400 cursor-pointer hover:text-gray-300">
                Remember me
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-gray-400 hover:text-indigo-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={loading}
              className="primary-btn w-full py-3.5"
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="social-btn w-full py-3.5 text-white"
            onClick={() => signIn("auth0", { callbackUrl: "/find-jobs" })}
          >
            Auth0
          </Button>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          By logging in, you agree to Masarak&apos;s{" "}
          <Link href="#" className="underline hover:text-gray-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-gray-300">
            Privacy Policy
          </Link>
          .
        </p>
      </AuthFormCard>
    </AuthPageLayout>
  );
}
