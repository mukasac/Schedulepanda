// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/pricing",
    "/about",
    "/blog",
    "/contact",
    "/api/webhooks(.*)",
    // Add other public marketing pages here
  ],
  ignoredRoutes: [
    // Clerk automatically ignores static files but we'll be explicit
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/_next/(.+)",
    "/favicon.ico",
    "/api(.+)",
  ],
});

export const config = {
  matcher: [
    // Match all routes
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Match API routes
    "/(api|trpc)(.*)",
    // Protected routes that require authentication
    "/scheduler(.*)",
    "/user-profile(.*)",
  ],
};