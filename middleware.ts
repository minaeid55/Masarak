import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/find-jobs", "/matching-jobs", "/courses", "/apply"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: [
    // "/find-jobs/:path*",
    // "/matching-jobs/:path*",
    // "/courses/:path*",
    // "/apply/:path*",
  ],
};
