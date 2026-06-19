"use server";

import { signupWithAuth0, requestAuth0PasswordReset } from "@/features/auth/services/auth0.service";

export type AuthActionResult = {
  success: boolean;
  message: string;
};

export async function signupAction(formData: FormData): Promise<AuthActionResult> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const company = String(formData.get("company") ?? "").trim();

  if (!fullName || !email || !password) {
    return { success: false, message: "Please fill in all required fields." };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  if (password.length < 8) {
    return { success: false, message: "Password must be at least 8 characters." };
  }

  try {
    const result = await signupWithAuth0({
      email,
      password,
      name: fullName,
      company: company || undefined,
    });

    if (result.error || result.message?.includes("error")) {
      return {
        success: false,
        message: result.description ?? result.message ?? "Unable to create account.",
      };
    }

    return {
      success: true,
      message: "Account created successfully. You can now log in.",
    };
  } catch {
    return {
      success: false,
      message: "Unable to connect to Auth0. Check your environment variables.",
    };
  }
}

export async function forgotPasswordAction(formData: FormData): Promise<AuthActionResult> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { success: false, message: "Please enter your email address." };
  }

  try {
    await requestAuth0PasswordReset(email);
    return {
      success: true,
      message: "If an account exists, a reset email has been sent.",
    };
  } catch {
    return {
      success: false,
      message: "Unable to send reset email. Check your Auth0 configuration.",
    };
  }
}
