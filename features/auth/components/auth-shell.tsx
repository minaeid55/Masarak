import Link from "next/link";
import type { ReactNode } from "react";

export function AuthBackground() {
  return (
    <>
      <div className="bg-shape-1" />
      <div className="bg-shape-2" />
      <div className="tech-lines" />
    </>
  );
}

type AuthHeaderProps = {
  backHref: string;
  backLabel?: string;
  backContent?: ReactNode;
};

export function AuthHeader({
  backHref,
  backLabel = "Back Home",
  backContent,
}: AuthHeaderProps) {
  return (
    <header className="w-full fixed top-0 left-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <AuthLogoLink size="sm" />
        {backContent ?? (
          <AuthBackLink href={backHref} label={backLabel} />
        )}
      </div>
    </header>
  );
}

type AuthLogoLinkProps = {
  size?: "sm" | "lg";
};

export function AuthLogoLink({ size = "sm" }: AuthLogoLinkProps) {
  const isLarge = size === "lg";

  return (
    <Link href="/" className="flex items-center gap-2">
      <AuthLogoMark className={isLarge ? "w-10 h-10" : "w-9 h-9"} />
      <span
        className={
          isLarge
            ? "text-3xl font-bold tracking-tight text-white"
            : "text-white font-bold text-xl"
        }
      >
        Masarak
      </span>
    </Link>
  );
}

function AuthLogoMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <div
      className={`${className} rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30`}
    >
      <svg
        className="w-5 h-5 text-white"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 512 512"
      >
        <path d="M512 96c0 50.2-59.1 125.1-84.6 155c-3.8 4.4-9.4 6.1-14.5 5H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c53 0 96 43 96 96s-43 96-96 96H139.6c8.7-9.9 19.3-22.6 30-36.8c6.3-8.4 12.8-17.6 19-27.2H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-53 0-96-43-96-96s43-96 96-96h39.8c-21-31.5-39.8-67.7-39.8-96c0-53 43-96 96-96s96 43 96 96zM117.1 489.1c-3.8 4.3-7.2 8.1-10.1 11.3l-1.8 2-.2-.2c-6 4.6-14.6 4-20-1.8C59.8 473 0 402.5 0 352c0-53 43-96 96-96s96 43 96 96c0 30-21.1 67-43.5 97.9c-10.7 14.7-21.7 28-30.8 38.5l-.6 .7zM128 352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM416 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
      </svg>
    </div>
  );
}

type AuthBackLinkProps = {
  href: string;
  label: string;
  showIcon?: boolean;
};

export function AuthBackLink({ href, label, showIcon = true }: AuthBackLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
    >
      {showIcon ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512">
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L141.3 288 246.6 182.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      ) : null}
      {label}
    </Link>
  );
}
