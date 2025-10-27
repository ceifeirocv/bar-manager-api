import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, username } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { db } from "./db";
import * as authSchemas from "./db/schemas/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema: authSchemas,
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true, // still needed for password flow
    requireEmailVerification: false,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Only block external signup requests (with HTTP request object)
      // Allow internal API calls (no request object)
      if (ctx.path === "/sign-up/email" && ctx.request) {
        throw new APIError("FORBIDDEN", {
          message: "Public signup is disabled. Contact an administrator.",
        });
      }
    }),
  },
  trustedOrigins: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : ["http://localhost:3000", "http://localhost:5173"],
  plugins: [username(), admin()],
  session: {
    expiresIn: 60 * 60 * 8,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
});
