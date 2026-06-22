"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { Button } from "@/components/ui/Button";

const navigation = [
  { href: "/", label: "Home", authRequired: false },
  { href: "/find-jobs", label: "Find Jobs", authRequired: true },
  { href: "/insights", label: "Insights", authRequired: true },
  { href: "/for-recruiters", label: "For Recruiters", authRequired: true },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const update = () => {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
      setIsAuthenticated(Boolean(localStorage.getItem("accessToken")));
    };

    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav id="header" className="fixed w-full z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl brand-linear flex items-center justify-center">
              <svg className="w-4 h-5 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 512 512">
                <path d="M512 96c0 50.2-59.1 125.1-84.6 155c-3.8 4.4-9.4 6.1-14.5 5H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c53 0 96 43 96 96s-43 96-96 96H139.6c8.7-9.9 19.3-22.6 30-36.8c6.3-8.4 12.8-17.6 19-27.2H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-53 0-96-43-96-96s43-96 96-96h39.8c-21-31.5-39.8-67.7-39.8-96c0-53 43-96 96-96s96 43 96 96zM117.1 489.1c-3.8 4.3-7.2 8.1-10.1 11.3l-1.8 2-.2-.2c-6 4.6-14.6 4-20-1.8C59.8 473 0 402.5 0 352c0-53 43-96 96-96s96 43 96 96c0 30-21.1 67-43.5 97.9c-10.7 14.7-21.7 28-30.8 38.5l-.6 .7zM128 352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM416 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Masarak</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {navigation.map(({ href, label, authRequired }) => {
              const isActive = isActiveLink(href);
              const showLink = !authRequired || isAuthenticated;
              if (!showLink) {
                return (
                  <Link key={href} href="/login" className={`text-sm font-medium transition-colors ${isActive ? "text-indigo-400" : "text-gray-300 hover:text-white"}`}>
                    {label}
                  </Link>
                );
              }
              return (
                <Link key={href} href={href} className={`text-sm font-medium transition-colors ${isActive ? "text-indigo-400" : "text-gray-300 hover:text-white"}`}>
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <span className="text-sm text-white/90">Hello</span>
                  <span className="text-sm font-semibold text-white truncate max-w-30">{user?.name ?? "User"}</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("role");
                    localStorage.removeItem("user");
                    router.push("/login");
                    setUser(null);
                    setIsAuthenticated(false);
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${pathname === "/login" ? "text-indigo-400 border border-indigo-500/50 bg-indigo-500/10" : "text-white border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10"}`}>
                  Log in
                </Link>
                <Link href="/signup" className={`relative px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-lg shadow-indigo-500/25 ${pathname === "/signup" ? "bg-linear-to-r from-indigo-600 to-purple-700 ring-2 ring-indigo-400/50" : "bg-linear-to-r from-indigo-500 to-purple-600 hover:opacity-90"}`}>
                  Sign up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button type="button" aria-label="Toggle mobile menu" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen((current) => !current)}>
              {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="md:hidden mt-4 space-y-4 pb-5">
            <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/90 p-4">
              {navigation.map(({ href, label, authRequired }) => {
                const isActive = isActiveLink(href);
                const showLink = !authRequired || isAuthenticated;
                return (
                  <Link key={href} href={showLink ? href : "/login"} onClick={() => setMenuOpen(false)} className={`block text-sm font-medium transition-colors ${isActive ? "text-indigo-400" : "text-gray-300 hover:text-white"}`}>
                    {label}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-300 text-sm px-2">{user?.name ?? "User"}</span>
                  <Button type="button" variant="primary" size="sm" className="w-full" onClick={() => { setMenuOpen(false); localStorage.removeItem("accessToken"); localStorage.removeItem("role"); localStorage.removeItem("user"); router.push("/login"); }}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className={`font-medium text-sm transition-colors ${pathname === "/login" ? "text-indigo-400" : "text-gray-300 hover:text-white"}`}>
                    Log in
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} className={`w-full text-center px-5 py-3 rounded-xl text-white font-semibold text-sm transition-all ${pathname === "/signup" ? "bg-linear-to-r from-indigo-600 to-purple-700 ring-2 ring-indigo-400/50" : "bg-linear-to-r from-indigo-500 to-purple-600"}`}>
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}