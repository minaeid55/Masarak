"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      // router.replace("/login");
    }
  }, [router, status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div className="rounded-3xl bg-white/5 p-10 shadow-2xl shadow-black/20 glass-card">
          <p className="text-white text-lg font-semibold">Checking your session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
