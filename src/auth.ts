import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, username } from "better-auth/plugins";
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
