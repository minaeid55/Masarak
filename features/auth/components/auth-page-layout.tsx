import type { ReactNode } from "react";

import { AuthBackground, AuthHeader } from "@/features/auth/components/auth-shell";

type AuthPageLayoutProps = {
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
  mainClassName?: string;
};

export function AuthPageLayout({
  children,
  backHref = "/",
  backLabel = "Back Home",
  mainClassName = "w-full max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center justify-center min-h-screen relative z-10 mt-12",
}: AuthPageLayoutProps) {
  return (
    <>
      <AuthBackground />
      <AuthHeader backHref={backHref} backLabel={backLabel} />
      <main className={mainClassName}>{children}</main>
    </>
  );
}
