"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { AuthCenteredCard } from "@/features/auth/components/auth-layout-parts";
import { AuthPageLayout } from "@/features/auth/components/auth-page-layout";
import { type AuthRole, verifyEmailApi } from "@/features/auth/services/auth.api";
import { showToast } from "@/lib/utils";

const OTP_LENGTH = 6;
const FIXED_OTP = "221314";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const roleParam = searchParams.get("role") as AuthRole | null;
  const [role, setRole] = useState<AuthRole>("user");
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (roleParam === "hr" || roleParam === "user" || roleParam === "admin") {
      setRole(roleParam);
    }
  }, [roleParam]);

  const verifyOtp = async (otp: string) => {
    if (!email) {
      setError("Missing email address.");
      return;
    }

    if (otp.length < OTP_LENGTH) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    if (otp !== FIXED_OTP) {
      setError("Invalid OTP");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await verifyEmailApi(email, otp, role);
      if (!response.ok) {
        setError(response.data.message || "Verification failed. Please try again.");
        setLoading(false);
        return;
      }

      localStorage.removeItem("pendingSignup");
      setLoading(false);
      router.push("/login?verified=1");
    } catch (err: any) {
      setError(err?.message ?? "Verification failed. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    await verifyOtp(digits.join(""));
  };

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) {
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = value;
    setDigits(nextDigits);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // auto-submit when all fields are entered
    if (nextDigits.every((digit) => digit !== "")) {
      setTimeout(async () => {
        await verifyOtp(nextDigits.join(""));
      }, 1000);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (!email) {
      setError("Missing email address.");
      return;
    }

    setError(null);
    setMessage(null);
    setResendLoading(true);

    setTimeout(() => {
      setMessage("Verification code resent. Use 221314.");
      setResendLoading(false);
    }, 300);
  };

  return (
    <AuthPageLayout backHref="/signup" backLabel="Back" mainClassName="w-full max-w-7xl mx-auto px-4 flex items-center justify-center min-h-screen pt-24 relative z-10">
      <AuthCenteredCard>
        <div className="text-center mb-6">
          <h2 className="text-white text-2xl font-bold mb-2">Verify your email</h2>
          <p className="text-gray-400 text-sm">
            Enter the 6-digit code sent to <span className="text-white">{email || "your email"}</span> for {role === "hr" ? "HR" : "Applicant"} registration.
          </p>
        </div>

        <div className="flex justify-between gap-2 mb-6">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <Input
              key={index}
              ref={(element) => {
                inputsRef.current[index] = element;
              }}
              maxLength={1}
              type="text"
              value={digits[index]}
              onChange={(event) => handleChange(event.target.value, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="w-12 h-12 text-center bg-white/5 border border-white/10 rounded-xl text-white text-lg p-0"
            />
          ))}
        </div>

        {error ? <p className="text-sm text-red-400 mb-4">{error}</p> : null}
        {message ? <p className="text-sm text-green-400 mb-4">{message}</p> : null}

        <Button
          type="button"
          variant="primary"
          size="sm"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full py-3.5"
        >
          {loading ? "Verifying..." : "Verify email"}
        </Button>

        <p className="text-sm text-gray-400 mt-5 text-center">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            disabled={resendLoading}
            onClick={handleResend}
            className="text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50"
          >
            {resendLoading ? "Resending..." : "Resend"}
          </button>
        </p>
      </AuthCenteredCard>
    </AuthPageLayout>
  );
}
