import Link from "next/link";

import type { AuthBrandingContent } from "@/features/auth/constants/auth-content";
import { AuthLogoLink } from "@/features/auth/components/auth-shell";

type AuthBrandingPanelProps = {
  content: AuthBrandingContent;
};

export function AuthBrandingPanel({ content }: AuthBrandingPanelProps) {
  return (
    <div className="hidden lg:flex flex-col justify-center w-1/2 pr-16 text-white h-full relative z-20">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <AuthLogoLink size="lg" />
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {content.title} <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
            {content.highlight}
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-md leading-relaxed">
          {content.description}
        </p>
        <div className="space-y-4">
          {content.features.map((feature) => (
            <div key={feature.label} className="flex items-center gap-4 text-gray-300">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${feature.colorClass}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </div>
              <span>{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type AuthMobileLogoProps = {
  className?: string;
};

export function AuthMobileLogo({ className = "mb-8" }: AuthMobileLogoProps) {
  return (
    <div className={`flex lg:hidden items-center justify-center gap-3 ${className}`}>
      <AuthLogoLink size="lg" />
    </div>
  );
}

type AuthFormCardProps = {
  children: React.ReactNode;
  className?: string;
  showGlow?: boolean;
};

export function AuthFormCard({
  children,
  className = "",
  showGlow = true,
}: AuthFormCardProps) {
  return (
    <div className={`w-full max-w-md lg:w-1/2 relative z-20 ${className}`}>
      <div className="glass-card rounded-2xl p-8 sm:p-10 w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50" />
        {children}
      </div>
      {showGlow ? (
        <>
          <div className="hidden lg:block absolute -top-12 -right-12 w-24 h-24 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="hidden lg:block absolute -bottom-12 -left-12 w-32 h-32 bg-linear-to-tr from-purple-500/20 to-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        </>
      ) : null}
    </div>
  );
}

type AuthCenteredCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuthCenteredCard({ children, className = "" }: AuthCenteredCardProps) {
  return (
    <div className={`w-full max-w-md relative z-20 ${className}`}>
      <div className="glass-card rounded-2xl p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-60" />
        {children}
      </div>
    </div>
  );
}

type AuthFormHeaderProps = {
  title: string;
  description?: React.ReactNode;
};

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 mx-auto bg-dark-800 rounded-2xl border border-gray-700 flex items-center justify-center mb-6 shadow-inner relative">
        <div
          className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-purple-500 animate-[spin_8s_linear_infinite]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 448 512">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      {description ? <div className="text-sm text-gray-400">{description}</div> : null}
    </div>
  );
}

type AuthFooterLinkProps = {
  text: string;
  linkText: string;
  href: string;
};

export function AuthFooterLink({ text, linkText, href }: AuthFooterLinkProps) {
  return (
    <p className="mt-8 text-center text-xs text-gray-500">
      {text}{" "}
      <Link href={href} className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
        {linkText}
      </Link>
    </p>
  );
}
