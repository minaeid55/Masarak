type Auth0TokenResponse = {
  access_token?: string;
  id_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

type Auth0SignupResponse = {
  _id?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  error?: string;
  message?: string;
  description?: string;
};

type Auth0ChangePasswordResponse = {
  error?: string;
  message?: string;
};

function getAuth0Domain(): string {
  const domain = process.env.AUTH0_ISSUER?.replace("https://", "").replace(/\/$/, "");
  if (!domain) {
    throw new Error("AUTH0_ISSUER is not configured.");
  }
  return domain;
}

function getAuth0Connection(): string {
  return process.env.AUTH0_CONNECTION ?? "Username-Password-Authentication";
}

export async function loginWithAuth0Credentials(
  email: string,
  password: string
): Promise<Auth0TokenResponse> {
  const domain = getAuth0Domain();

  const response = await fetch(`https://${domain}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "password",
      username: email,
      password,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      scope: "openid profile email",
    }),
  });

  return response.json() as Promise<Auth0TokenResponse>;
}

export async function signupWithAuth0(input: {
  email: string;
  password: string;
  name: string;
  company?: string;
}): Promise<Auth0SignupResponse> {
  const domain = getAuth0Domain();

  const response = await fetch(`https://${domain}/dbconnections/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      email: input.email,
      password: input.password,
      name: input.name,
      connection: getAuth0Connection(),
      user_metadata: input.company ? { company: input.company } : undefined,
    }),
  });

  return response.json() as Promise<Auth0SignupResponse>;
}

export async function requestAuth0PasswordReset(
  email: string
): Promise<Auth0ChangePasswordResponse> {
  const domain = getAuth0Domain();

  const response = await fetch(`https://${domain}/dbconnections/change_password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      email,
      connection: getAuth0Connection(),
    }),
  });

  const text = await response.text();
  if (!text) {
    return { message: "Password reset email sent." };
  }

  try {
    return JSON.parse(text) as Auth0ChangePasswordResponse;
  } catch {
    return { message: text };
  }
}

export function decodeAuth0IdToken(idToken: string): {
  email?: string;
  name?: string;
  sub?: string;
} {
  const payload = idToken.split(".")[1];
  if (!payload) {
    return {};
  }

  const decoded = Buffer.from(payload, "base64url").toString("utf-8");
  return JSON.parse(decoded) as { email?: string; name?: string; sub?: string };
}
