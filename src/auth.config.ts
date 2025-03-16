import type { NextAuthConfig } from "next-auth";

const protectedRoutes = [
  "/checkout/address",
  // "/category/women",
  // "/category/kid",
  // "/category/men",
];

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );
      console.log(isOnProtectedRoute);
      if (isOnProtectedRoute) {
        if (isLoggedIn) return true;
        console.log("redirecting to login");
        return false;
      }
      if (isLoggedIn && nextUrl.pathname.startsWith("/auth/login")) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
