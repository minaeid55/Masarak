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
import { signupApi } from "@/features/auth/services/auth.api";
import { showToast } from "@/lib/utils";

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
        const msg = "Please fill in all required fields.";
        setError(msg);
        showToast(msg, { type: "error" });
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        const msg = "Please enter a valid email address.";
        setError(msg);
        showToast(msg, { type: "error" });
        setLoading(false);
        return;
      }

      if (password.length < 8) {
        const msg = "Password must be at least 8 characters.";
        setError(msg);
        showToast(msg, { type: "error" });
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        const msg = "Passwords do not match.";
        setError(msg);
        showToast(msg, { type: "error" });
        setLoading(false);
        return;
      }

      const imageVerificationEntry = formData.get("image_verification");
      const imageVerificationName =
        role === "hr" && imageVerificationEntry instanceof File
          ? imageVerificationEntry.name
          : undefined;

      const payload: any = {
        username,
        email,
        password,
        first_name,
        last_name,
        role,
      };

      if (role === "hr") {
        const companyName = String(formData.get("company_name") ?? "").trim();
        const website = String(formData.get("website") ?? "").trim();
        const national_id = String(formData.get("national_id") ?? "").trim();
        const file = formData.get("image_verification");

        if (!companyName || !website || !national_id || !file) {
          const msg = "Please fill in all required fields and attach verification image.";
          setError(msg);
          showToast(msg, { type: "error" });
          setLoading(false);
          return;
        }

        payload.company_name = companyName;
        payload.website = website;
        payload.national_id = national_id;
        payload.image_verification = imageVerificationName;
      }

      await signupApi(payload);
      showToast("Account created successfully.", { type: "success", duration: 2000 });
      await new Promise((r) => setTimeout(r, 2000));
      setLoading(false);
      router.push(`/verify-email?email=${encodeURIComponent(email)}&role=${role}`);
    } catch (err: any) {
      const msg = err?.message ?? "An unexpected error occurred.";
      setError(msg);
      showToast(msg, { type: "error" });
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
                <Label htmlFor="company_name" className="mb-1.5">
                  Company Name
                </Label>
                <AuthInputField
                  id="company_name"
                  name="company_name"
                  placeholder="Enter company name"
                  required={role === "hr"}
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                      <path d="M64 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16h80V400c0-26.5 21.5-48 48-48s48 21.5 48 48v64h80c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
                    </svg>
                  }
                  className="pl-10 py-2.5"
                />
              </div>

              <div>
                <Label htmlFor="website" className="mb-1.5">
                  Company Website
                </Label>
                <AuthInputField
                  id="website"
                  name="website"
                  placeholder="https://company.com"
                  required={role === "hr"}
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm-112.6 0H243.7c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64h24.5c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zM168.3 192c-2.2 20.4-3.3 41.8-3.3 64s1.2 43.6 3.3 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64H168.3zM256 0c-20.5 0-41.9 2.8-64 8.1V131.3c20.6-2.1 42-3.2 64-3.2s43.4 1.1 64 3.2V8.1C297.9 2.8 276.5 0 256 0zM131.3 48.4C113.7 65.9 99 86.2 88.1 108.8C107.4 97.4 129.6 88.2 153.6 81.8c-8.3-12.3-17.8-23.8-22.3-33.4zM458.4 84.9c-15.8-17.4-34.7-31.2-55.8-40.5c12.9 10.9 24.3 23.2 34.1 36.9c5.6 7.9 10.7 16.2 15.1 24.9c8.2-7.4 14.5-15.1 18.4-21.3c1.9-2.9 3.5-5.5 4.9-8.1c-2.7-2.4-5.8-4.6-9.6-6.8c-2.6-1.5-5.5-2.8-8.7-4.1zM53.6 222.4c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H24.3C21.1 299.5 18 278.1 18 256s3.1-43.5 6.3-64h29.3zM8.1 192H16.3c3.4-21.2 8.9-41.5 16.4-60.6c-11.2 7.3-20.8 16-28.4 26.1c-3.8 5-7 10.4-9.5 16.2c-2.1 4.8-3.7 9.8-4.8 15.1c-2.7 12.4-4.5 25.2-5.4 38.3zM152.3 465.1c-23.8-7-45.8-16.8-65.2-28.9c11.2 23.2 26.5 43.6 45 60.2c5.2-11.5 11.9-24.7 20.2-31.3zM374.4 462.6c14.4-11.1 27.3-24 38.5-38.4c-8.6 6.6-18.4 12.3-28.8 17.2c-9.6 4.6-19.8 8.2-30.5 10.7c4.1-11.5 8.3-24.4 10.1-33.4c5.2-25.7 7.6-52.8 7.6-80.7c0-28.1-2.5-55.4-7.6-81.1c-1.8-9-6.1-22-10.1-33.5c10.8 2.5 20.9 6.1 30.5 10.7c10.4 4.9 20.2 10.6 28.8 17.2c-11.2-14.4-24.1-27.3-38.5-38.4c2.3 9.8 4.2 19.4 5.5 28.8c2.7 19.6 4.1 39.7 4.1 60.2s-1.4 40.6-4.1 60.2c-1.3 9.3-3.2 19-5.5 28.8zM459.2 346.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64h29.3c3.1 20.5 6.2 41.9 6.2 64s-3.1 43.5-6.2 64h-29.3zM480.5 300.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64H500.8c1.6 20.7 2.6 42.1 2.6 64s-1 43.3-2.6 64H480.5z" />
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
                    placeholder="Enter national ID"
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
                      <span className="shrink-0 px-4 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
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