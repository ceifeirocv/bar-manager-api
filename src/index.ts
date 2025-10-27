import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import "dotenv/config";
import { createAdminUser } from "./lib/utils";
import usersRoutes from "./modules/users/users.routes";
import { errorResponse } from "./lib/response";

const app: Express = express();
const port = process.env.PORT || 4000;
const app_url = process.env.BETTER_AUTH_URL || `http://localhost:${port}`;
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

const allowedOrigin = process.env.CORS_ORIGIN?.split(",") || [
  "http://localhost:5173",
];

console.log("CORS allowed origins:", allowedOrigin);
app.use(
  cors({
    origin: allowedOrigin, // Configurable via environment variable
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

// Routes
app.use("/api/users", usersRoutes);

// 404 handler - must be after all routes
app.use((req: Request, res: Response) => {
  errorResponse(
    res,
    "Route not found",
    "NOT_FOUND",
    `Cannot ${req.method} ${req.originalUrl}`,
    404
  );
});

// Global error handler - must be last
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);

  // Check if response has already been sent
  if (res.headersSent) {
    return next(err);
  }

  errorResponse(
    res,
    "Internal Server Error",
    "INTERNAL_SERVER_ERROR",
    err.message || "An unexpected error occurred",
    500
  );
});

app.listen(port, () => {
  createAdminUser();
  console.log(`[server]: Server is running at ${app_url}`);
});
