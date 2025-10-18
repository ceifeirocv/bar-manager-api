import { Request, Response } from "express";
import { db } from "../../db";
import { users } from "../../db/schemas/auth";
import { eq } from "drizzle-orm";
import { auth } from "../../auth";
import { partialUpdateUserSchema } from "./users.validator";
import { errorResponse, successResponse } from "../../lib/response";

type UpdateUserData = Partial<typeof users.$inferInsert>;

export const updateUser = async (
  req: Request & { session?: typeof auth.$Infer.Session },
  res: Response
) => {
  try {
    const userId = req.session?.user?.id;

    if (!userId) {
      return errorResponse(
        res,
        "Unauthorized",
        "UNAUTHORIZED",
        "You must be logged in to update your profile.",
        401
      );
    }

    const body = partialUpdateUserSchema.parse(req.body);

    console.log({ body });

    const updateData: UpdateUserData = body;

    const {
      id: _,
      createdAt,
      emailVerified,
      banReason,
      banExpires,
      email,
      role,
      banned,
      username,
      ...allowedUpdates
    } = updateData;

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!existingUser) {
      return errorResponse(
        res,
        "User not found",
        "USER_NOT_FOUND",
        "The user you are trying to update does not exist.",
        404
      );
    }

    // Update the user
    const [updatedUser] = await db
      .update(users)
      .set({
        ...allowedUpdates,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    return successResponse(res, "User updated successfully", updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return errorResponse(
      res,
      "Internal Server Error",
      "INTERNAL_SERVER_ERROR",
      "An error occurred while updating the user.",
      500
    );
  }
};
