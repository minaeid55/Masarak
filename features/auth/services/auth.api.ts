export type AuthRole = "jobseeker" | "hr" | "admin";

const API_BASE = "https://masarak-rt9w.onrender.com";

export type LoginResponse = {
  message: string;
  accessToken?: string;
};

export type VerifyEmailResponse = {
  message: string;
};

async function parseJson<T>(response: Response): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}

export async function loginApi(
  username: string,
  password: string,
  role: AuthRole
): Promise<{ ok: boolean; status: number; data: LoginResponse }> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      role,
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await parseJson<LoginResponse>(response);
  return { ok: response.ok, status: response.status, data };
}

export async function verifyEmailApi(
  email: string,
  otp: string,
  role: AuthRole
): Promise<{ ok: boolean; status: number; data: VerifyEmailResponse }> {
  const response = await fetch(`${API_BASE}/api/auth/email/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      role,
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await parseJson<VerifyEmailResponse>(response);
  return { ok: response.ok, status: response.status, data };
}

export async function resendVerificationEmailApi(
  email: string,
  role: AuthRole
): Promise<{ ok: boolean; status: number; data: VerifyEmailResponse }> {
  const response = await fetch(`${API_BASE}/api/auth/email/resend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      role,
    },
    body: JSON.stringify({ email }),
  });

  const data = await parseJson<VerifyEmailResponse>(response);
  return { ok: response.ok, status: response.status, data };
}
