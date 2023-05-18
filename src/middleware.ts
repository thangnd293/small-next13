import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getLatestDraft } from "./services/server/article";
import { getUser, getUserByToken } from "./services/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/sign-up");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    if (req.nextUrl.pathname.startsWith("/draft")) {
      const user = await getUserByToken(token.accessToken as string);
      if (!user) return NextResponse.redirect(new URL("/login", req.url));

      const userInfo = await getUser(user.username);
      if (!userInfo) return NextResponse.redirect(new URL("/login", req.url));

      if (!userInfo.contentCreator) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    if (req.nextUrl.pathname === "/draft") {
      const draft = await getLatestDraft(token);

      return NextResponse.redirect(new URL(`/draft/${draft.id}`, req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/draft",
    "/draft/:path*",
    "/login",
    "/register",
    "/profile",
    "/profile/:path*",
  ],
};
