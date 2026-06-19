"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { AuthStepIndicator } from "@/features/auth/components/auth-step-indicator";
import { AuthCenteredCard } from "@/features/auth/components/auth-layout-parts";
import { AuthPageLayout } from "@/features/auth/components/auth-page-layout";

export default function VerifyPage() {
  const router = useRouter();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = event.target.value;
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  return (
    <AuthPageLayout backHref="/forgot-password" backLabel="Back" mainClassName="w-full max-w-7xl mx-auto px-4 flex items-center justify-center min-h-screen pt-24 relative z-10">
      <AuthCenteredCard>
        <AuthStepIndicator currentStep={2} />

        <h2 className="text-white text-2xl font-bold mb-2 text-center">Verify Code</h2>
        <p className="text-gray-400 text-sm mb-8 text-center">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex justify-between gap-2 mb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Input
              key={index}
              ref={(element) => {
                inputsRef.current[index] = element;
              }}
              maxLength={1}
              type="text"
              onChange={(event) => handleChange(event, index)}
              className="w-12 h-12 text-center bg-white/5 border border-white/10 rounded-xl text-white text-lg p-0"
            />
          ))}
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => router.push("/reset")}
          className="primary-btn w-full py-3.5"
        >
          Verify
        </Button>

        <p className="text-sm text-gray-400 mt-5 text-center">
          Didn&apos;t receive code?{" "}
          <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">Resend</span>
        </p>
      </AuthCenteredCard>
    </AuthPageLayout>
  );
}
