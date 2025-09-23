import express, { Express, Request, Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import "dotenv/config";
import { requireAuth } from "./middlewares/auth";
import { createAdminUser } from "./lib/utils";

const app: Express = express();
const port = process.env.PORT || 4000;
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(
  cors({
    origin: allowedOrigin, // Configurable via environment variable
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.get("/api/protected", requireAuth, (req: Request, res: Response) => {
  res.send("This is a protected route");
});

app.listen(port, () => {
  createAdminUser();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
