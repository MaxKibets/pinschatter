import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnRoom = nextUrl.pathname.startsWith("/room");

      if (isOnRoom) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/room", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
