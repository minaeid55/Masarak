export type AuthRole = "user" | "hr" | "admin";

export type AuthUser = {
  role: AuthRole;
  username: string;
  password: string;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  national_id?: string;
  image_verification?: string;
};

export type LoginResponse = {
  message: string;
  accessToken?: string;
  user?: Omit<AuthUser, "password">;
};

export type VerifyEmailResponse = {
  message: string;
};

const MOCK_USERS: AuthUser[] = [
  {
    role: "user",
    username: "kerollisemad",
    password: "Kerollis123",
    name: "Kerollis Emad",
    email: "kerollis@example.com",
    first_name: "Kerollis",
    last_name: "Emad",
  },
  {
    role: "hr",
    username: "minaeid",
    password: "Mina12345",
    name: "Mina Eid",
    email: "mina@example.com",
    first_name: "Mina",
    last_name: "Eid",
  },
  {
    role: "admin",
    username: "fatmanajah",
    password: "Fatma12345",
    name: "Fatma Najah",
    email: "fatma@example.com",
    first_name: "Fatma",
    last_name: "Najah",
  },
];

const FIXED_OTP = "221314";
const STORAGE_KEY_SAVED_USERS = "mockUsers";
const STORAGE_KEY_PENDING_SIGNUP = "pendingSignup";

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: AuthRole;
  company?: string;
  national_id?: string;
  image_verification?: string;
};

function getSavedUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_USERS);
    return raw ? (JSON.parse(raw) as AuthUser[]) : [];
  } catch {
    return [];
  }
}

function setSavedUsers(users: AuthUser[]) {
  localStorage.setItem(STORAGE_KEY_SAVED_USERS, JSON.stringify(users));
}

function getPendingSignup(): SignupPayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PENDING_SIGNUP);
    return raw ? (JSON.parse(raw) as SignupPayload) : null;
  } catch {
    return null;
  }
}

function clearPendingSignup() {
  localStorage.removeItem(STORAGE_KEY_PENDING_SIGNUP);
}

function savePendingSignupAsUser(payload: SignupPayload) {
  const users = getSavedUsers();
  const name = `${payload.first_name} ${payload.last_name}`.trim();
  const newUser: AuthUser = {
    ...payload,
    name,
  };

  const existingIndex = users.findIndex(
    (user) => user.username === newUser.username && user.role === newUser.role
  );

  if (existingIndex >= 0) {
    users[existingIndex] = newUser;
  } else {
    users.push(newUser);
  }

  setSavedUsers(users);
}

function getAllUsers(): AuthUser[] {
  return [...MOCK_USERS, ...getSavedUsers()];
}

export async function signupApi(
  payload: SignupPayload
): Promise<{ ok: boolean; status: number; data: { message: string } }> {
  localStorage.setItem(STORAGE_KEY_PENDING_SIGNUP, JSON.stringify(payload));
  return {
    ok: true,
    status: 200,
    data: { message: "Signup saved locally." },
  };
}

export async function loginApi(
  username: string,
  password: string,
  role: AuthRole
): Promise<{ ok: boolean; status: number; data: LoginResponse }> {
  const matchedUser = getAllUsers().find(
    (user) => user.username === username && user.password === password && user.role === role
  );

  if (!matchedUser) {
    return {
      ok: false,
      status: 401,
      data: { message: "Invalid username or password." },
    };
  }

  const { password: _, ...safeUser } = matchedUser;

  return {
    ok: true,
    status: 200,
    data: {
      message: "Login successful.",
      accessToken: "mock-token",
      user: safeUser,
    },
  };
}

export async function verifyEmailApi(
  email: string,
  otp: string,
  role: AuthRole
): Promise<{ ok: boolean; status: number; data: VerifyEmailResponse }> {
  if (otp !== FIXED_OTP) {
    return {
      ok: false,
      status: 400,
      data: { message: "Invalid OTP" },
    };
  }

  const pendingSignup = getPendingSignup();
  if (pendingSignup && pendingSignup.email === email && pendingSignup.role === role) {
    savePendingSignupAsUser(pendingSignup);
    clearPendingSignup();
  }

  return {
    ok: true,
    status: 200,
    data: { message: "Email verified successfully." },
  };
}

export async function resendVerificationEmailApi(
  email: string,
  role: AuthRole
): Promise<{ ok: boolean; status: number; data: VerifyEmailResponse }> {
  return {
    ok: true,
    status: 200,
    data: { message: "Verification code resent. Use 221314." },
  };
}
