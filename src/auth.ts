import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true, // still needed for password flow
    requireEmailVerification: false,
  },
  plugins: [username()],
  session: {
    expiresIn: 60 * 60 * 8,
    updateAge: 60 * 60 * 24,
  },
});
