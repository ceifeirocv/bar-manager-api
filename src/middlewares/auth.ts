// src/middlewares/auth.ts
import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth"; // Ensure this exports your configured Better Auth instance

/**
 * Attaches session to req.session if authenticated, else responds 401 Unauthorized.
 */
export async function requireAuth(
  req: Request & { session?: typeof auth.$Infer.Session },
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    req.session = session;
    next();
  } catch (err) {
    next(err);
  }
}
