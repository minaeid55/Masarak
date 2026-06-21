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
import { loginApi, type AuthRole } from "@/features/auth/services/auth.api";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<AuthRole>("jobseeker");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!username || !password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await loginApi(username, password, role);

      if (!response.ok) {
        setError(response.data.message || "Invalid username or password.");
        setLoading(false);
        return;
      }

      const accessToken = response.data.accessToken;
      if (!accessToken) {
        setError("Login failed. No token returned.");
        setLoading(false);
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role);

      switch (role) {
        case "jobseeker":
          router.push("/find-jobs");
          break;
        case "hr":
          router.push("/for-recruiters");
          break;
        case "admin":
          router.push("/admin");
          break;
      }
    } catch (err: any) {
      setError(err?.message ?? "Unable to login. Please try again.");
      setLoading(false);
    }
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

        <div className="mb-6 flex justify-center gap-2">
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              role === "jobseeker" ? "bg-indigo-600 text-white" : "bg-dark-800 text-gray-400"
            }`}
            onClick={() => setRole("jobseeker")}
          >
            Applicant
          </button>
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              role === "hr" ? "bg-indigo-600 text-white" : "bg-dark-800 text-gray-400"
            }`}
            onClick={() => setRole("hr")}
          >
            HR
          </button>
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              role === "admin" ? "bg-indigo-600 text-white" : "bg-dark-800 text-gray-400"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInputField
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            required
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM313.6 288h-15.7c-22.2 10-46 16-73.9 16s-51.7-6-73.9-16h-15.7C60.3 288 0 348.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.1-60.3-134.4-134.4-134.4z" />
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
            onClick={() =>
              signIn("auth0", {
                callbackUrl:
                  role === "jobseeker"
                    ? "/find-jobs"
                    : role === "hr"
                    ? "/for-recruiters"
                    : "/admin",
              })
            }
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
