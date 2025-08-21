import express, { Express, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import { db } from "./db";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";

const app: Express = express();
const port = process.env.PORT || 3000;

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

const createAdminUser = async () => {
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
      await auth.api.signUpEmail({
        body: {
          name: ADMIN_USERNAME,
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD,
          email: ADMIN_EMAIL,
        },
      });
      console.log("Admin user created successfully");
    } catch (error) {
      console.log("Failed to create admin user:", error);
    }
  } else {
    console.log("Admin credentials not provided in environment variables");
    console.log(`ADMIN_USERNAME: ${ADMIN_USERNAME ? "set" : "not set"}`);
    console.log(`ADMIN_PASSWORD: ${ADMIN_PASSWORD ? "set" : "not set"}`);
    console.log(`ADMIN_EMAIL: ${ADMIN_EMAIL ? "set" : "not set"}`);
  }
};

app.listen(port, () => {
  createAdminUser();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
