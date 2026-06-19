"use client";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { AuthStepIndicator } from "@/features/auth/components/auth-step-indicator";
import { AuthCenteredCard } from "@/features/auth/components/auth-layout-parts";
import { AuthPageLayout } from "@/features/auth/components/auth-page-layout";

export default function ResetPasswordPage() {
  return (
    <AuthPageLayout mainClassName="w-full max-w-7xl mx-auto px-4 flex items-center justify-center min-h-screen relative z-10 pt-24">
      <AuthCenteredCard>
        <AuthStepIndicator currentStep={3} />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
          <p className="text-sm text-gray-400">
            Create a new secure password for your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
          <Input
            type="password"
            placeholder="New password"
            className="py-3.5 px-4 placeholder-gray-500"
          />
          <Input
            type="password"
            placeholder="Confirm password"
            className="py-3.5 px-4 placeholder-gray-500"
          />

          <Link
            href="/login"
            className="primary-btn w-full py-3.5 rounded-xl font-semibold text-center block text-sm text-white"
          >
            Reset Password
          </Link>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Remember it?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
            Back to login
          </Link>
        </p>
      </AuthCenteredCard>
    </AuthPageLayout>
  );
}
