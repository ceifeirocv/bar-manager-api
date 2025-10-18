import { eq } from "drizzle-orm";
import { auth } from "../auth";
import { db } from "../db";
import { users } from "../db/schemas/auth";

export const createAdminUser = async () => {
  const { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (ADMIN_USERNAME && ADMIN_PASSWORD && ADMIN_EMAIL) {
    try {
      // Check if admin user already exists using raw query
      const existingUsers = await db
        .select()
        .from(users)
        .where(eq(users.username, ADMIN_USERNAME));

      if (existingUsers.length > 0) {
        console.log(
          `Admin user already exists: ${
            existingUsers[0].username || existingUsers[0].email
          }`
        );
        return;
      }

      // Create admin user if it doesn't exist
      const result = await auth.api.signUpEmail({
        body: {
          name: ADMIN_USERNAME,
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD,
          email: ADMIN_EMAIL,
        },
      });

      // Update user role to admin after creation
      if (result && result.user) {
        await db
          .update(users)
          .set({ role: "admin" })
          .where(eq(users.id, result.user.id));
      }

      console.log("Admin user created successfully");
    } catch (error) {
      console.log(
        "Failed to create admin user:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  } else {
    console.log("Admin credentials not provided in environment variables");
    console.log(`ADMIN_USERNAME: ${ADMIN_USERNAME ? "set" : "not set"}`);
    console.log(`ADMIN_PASSWORD: ${ADMIN_PASSWORD ? "set" : "not set"}`);
    console.log(`ADMIN_EMAIL: ${ADMIN_EMAIL ? "set" : "not set"}`);
  }
};
