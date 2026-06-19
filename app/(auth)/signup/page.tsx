"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { signupAction } from "@/features/auth/actions/auth.actions";
import { signupBranding } from "@/features/auth/constants/auth-content";
import {
  AuthBrandingPanel,
  AuthFormCard,
  AuthMobileLogo,
} from "@/features/auth/components/auth-layout-parts";
import { AuthInputField, PasswordField } from "@/features/auth/components/auth-fields";
import { AuthPageLayout } from "@/features/auth/components/auth-page-layout";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await signupAction(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    router.push("/login?registered=1");
  }

  return (
    <AuthPageLayout mainClassName="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen relative z-10 mt-24">
      <AuthBrandingPanel content={signupBranding} />

      <AuthFormCard className="lg:w-1/2">
        <AuthMobileLogo />

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-indigo-400">Step 2 of 2</span>
            <span className="text-sm text-gray-500">Account Details</span>
          </div>
          <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-indigo-500 to-purple-500 w-full rounded-full" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
          <p className="text-sm text-gray-400">Enter your details to finalize registration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="fullName" className="mb-1.5">
              Full Name
            </Label>
            <AuthInputField
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              required
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                </svg>
              }
              className="pl-10 py-2.5"
            />
          </div>

          <div>
            <Label htmlFor="email" className="mb-1.5">
              Work Email
            </Label>
            <AuthInputField
              id="email"
              name="email"
              type="email"
              placeholder="john@company.com"
              required
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                </svg>
              }
              className="pl-10 py-2.5"
            />
          </div>

          <div>
            <Label htmlFor="company" className="mb-1.5">
              Organization / Company{" "}
              <span className="text-gray-500 text-xs font-normal">(Optional)</span>
            </Label>
            <AuthInputField
              id="company"
              name="company"
              placeholder="Acme Inc."
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M64 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16h80V400c0-26.5 21.5-48 48-48s48 21.5 48 48v64h80c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
                </svg>
              }
              className="pl-10 py-2.5"
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-1.5">
              Password
            </Label>
            <PasswordField
              id="password"
              name="password"
              required
              inputClassName="py-2.5 pl-10"
            />
            <div className="mt-2">
              <div className="flex gap-1 h-1 mb-1">
                {[1, 2, 3, 4].map((bar) => (
                  <div key={bar} className="w-1/4 bg-dark-700 rounded-full" />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Must be at least 8 characters with numbers and symbols
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="mb-1.5">
              Confirm Password
            </Label>
            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
              inputClassName="py-2.5 pl-10"
            />
          </div>

          <div className="flex items-start mt-4 gap-3">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-gray-400 font-normal leading-relaxed">
              I agree to the{" "}
              <Link href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                Privacy Policy
              </Link>
            </Label>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="mt-8 pt-4 border-t border-gray-800/50 flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <Link
                href="/login"
                className="px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                Back
              </Link>
              <Button type="submit" variant="primary" size="sm" disabled={loading} className="px-6 py-2.5">
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </div>
            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </AuthFormCard>
    </AuthPageLayout>
  );
}
