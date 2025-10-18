import { Router } from "express";
import { updateUser } from "./users.controller";
import { requireAuth } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { partialUpdateUserSchema } from "./users.validator";

const router = Router();

// Update user endpoint - protected route (updates authenticated user's profile)
router.put("/", requireAuth, validate(partialUpdateUserSchema), updateUser);

export default router;
