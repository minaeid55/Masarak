"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [hasAccessToken, setHasAccessToken] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    if (!token) {
      router.replace("/login");
      return;
    }

    setHasAccessToken(true);
  }, [router]);

  if (!hasAccessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div className="rounded-3xl bg-white/5 p-10 shadow-2xl shadow-black/20 glass-card">
          <p className="text-white text-lg font-semibold">Checking your login status...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
