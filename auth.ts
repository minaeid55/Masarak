import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";
import Credentials from "next-auth/providers/credentials";

import {
  decodeAuth0IdToken,
  loginWithAuth0Credentials,
} from "@/features/auth/services/auth0.service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        try {
          const tokenResponse = await loginWithAuth0Credentials(email, password);

          if (tokenResponse.error || !tokenResponse.id_token) {
            return null;
          }

          const profile = decodeAuth0IdToken(tokenResponse.id_token);

          return {
            id: profile.sub ?? email,
            email: profile.email ?? email,
            name: profile.name ?? email,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      if (account?.provider === "auth0") {
        token.provider = "auth0";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
  trustHost: true,
});
