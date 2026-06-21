"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  const [role, setRole] = useState<"user" | "hr">("user");
  const [verificationFileName, setVerificationFileName] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const username = String(formData.get("username") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");
      const confirmPassword = String(formData.get("confirmPassword") ?? "");
      const first_name = String(formData.get("first_name") ?? "").trim();
      const last_name = String(formData.get("last_name") ?? "").trim();

      if (!username || !email || !password || !first_name || !last_name) {
        setError("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      if (role === "user") {
        const payload = {
          username,
          email,
          password,
          first_name,
          last_name,
        };

        const res = await fetch("https://masarak-rt9w.onrender.com/api/auth/signup/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({ message: "Unknown error" }));

        if (!res.ok) {
          setError(data?.message ?? "Unable to create account.");
          setLoading(false);
          return;
        }

        setLoading(false);
        router.push(`/verify-email?email=${encodeURIComponent(email)}&role=${role === "user" ? "jobseeker" : "hr"}`);
        return;
      }

      // HR
      const company = String(formData.get("company") ?? "").trim();
      const national_id = String(formData.get("national_id") ?? "").trim();
      const file = formData.get("image_verification");

      if (!company || !national_id || !file) {
        setError("Please fill in all required fields and attach verification image.");
        setLoading(false);
        return;
      }

      const fd = new FormData();
      fd.append("username", username);
      fd.append("email", email);
      fd.append("password", password);
      fd.append("first_name", first_name);
      fd.append("last_name", last_name);
      fd.append("company", company);
      fd.append("national_id", national_id);
      if (file instanceof File) {
        fd.append("image_verification", file);
      } else {
        try {
          // @ts-ignore
          if (file && file[0]) fd.append("image_verification", file[0]);
        } catch (e) {
          // ignore
        }
      }

      const res = await fetch("https://masarak-rt9w.onrender.com/api/auth/signup/hr", {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => ({ message: "Unknown error" }));

      if (!res.ok) {
        setError(data?.message ?? "Unable to create account.");
        setLoading(false);
        return;
      }

      setLoading(false);
      router.push(`/verify-email?email=${encodeURIComponent(email)}&role=hr`);
    } catch (err: any) {
      setError(err?.message ?? "An unexpected error occurred.");
      setLoading(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVerificationFileName(e.target.files[0].name);
    } else {
      setVerificationFileName("");
    }
  };

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
          <div className="flex items-center gap-2 justify-center">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`px-4 py-2 rounded-xl text-sm ${role === "user" ? "bg-indigo-600 text-white" : "text-gray-400 bg-dark-800"}`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole("hr")}
              className={`px-4 py-2 rounded-xl text-sm ${role === "hr" ? "bg-indigo-600 text-white" : "text-gray-400 bg-dark-800"}`}
            >
              Employer (HR)
            </button>
          </div>

          <input type="hidden" name="role" value={role} />

          <div>
            <Label htmlFor="username" className="mb-1.5">
              Username
            </Label>
            <AuthInputField
              id="username"
              name="username"
              placeholder="username"
              required
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM313.6 288h-15.7c-22.2 10-46 16-73.9 16s-51.7-6-73.9-16h-15.7C60.3 288 0 348.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.1-60.3-134.4-134.4-134.4z" />
                </svg>
              }
              className="pl-10 py-2.5"
            />
          </div>

          <div>
            <Label htmlFor="email" className="mb-1.5">
              Email
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

          {role === "hr" ? (
            <>
              <div>
                <Label htmlFor="company" className="mb-1.5">
                  Organization / Company
                </Label>
                <AuthInputField
                  id="company"
                  name="company"
                  placeholder="Acme Inc."
                  required={role === "hr"}
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                      <path d="M64 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16h80V400c0-26.5 21.5-48 48-48s48 21.5 48 48v64h80c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
                    </svg>
                  }
                  className="pl-10 py-2.5"
                />
              </div>
            </>
          ) : null}

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name" className="mb-1.5">
                First Name
              </Label>
              <AuthInputField
                id="first_name"
                name="first_name"
                placeholder="John"
                required
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM313.6 288h-15.7c-22.2 10-46 16-73.9 16s-51.7-6-73.9-16h-15.7C60.3 288 0 348.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.1-60.3-134.4-134.4-134.4z" />
                  </svg>
                }
                className="pl-10 py-2.5"
              />
            </div>

            <div>
              <Label htmlFor="last_name" className="mb-1.5">
                Last Name
              </Label>
              <AuthInputField
                id="last_name"
                name="last_name"
                placeholder="Doe"
                required
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM313.6 288h-15.7c-22.2 10-46 16-73.9 16s-51.7-6-73.9-16h-15.7C60.3 288 0 348.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.1-60.3-134.4-134.4-134.4z" />
                  </svg>
                }
                className="pl-10 py-2.5"
              />
            </div>
          </div>

          {role === "hr" ? (
            <>
              <div>
                <div className="mt-4">
                  <Label htmlFor="national_id" className="mb-1.5">
                    National ID
                  </Label>
                  <AuthInputField
                    id="national_id"
                    name="national_id"
                    placeholder="ID Number"
                    required
                    icon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM313.6 288h-15.7c-22.2 10-46 16-73.9 16s-51.7-6-73.9-16h-15.7C60.3 288 0 348.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.1-60.3-134.4-134.4-134.4z" />
                      </svg>
                    }
                    className="pl-10 py-2.5"
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor="image_verification" className="mb-1.5 block">
                    Image Verification
                  </Label>
                  <div className="relative">
                    <input
                      id="image_verification"
                      name="image_verification"
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full rounded-2xl border border-white/10 bg-dark-800/50 px-4 py-3 text-sm text-gray-400 flex items-center justify-between transition-all duration-200 hover:border-indigo-500/30">
                      <span className="truncate">
                        {verificationFileName || "Choose an image file..."}
                      </span>
                      <span className="flex-shrink-0 px-4 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                        Browse
                      </span>
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    Upload a photo of yourself holding your national ID (JPG, PNG, WebP)
                  </p>
                </div>
              </div>
            </>
          ) : null}

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