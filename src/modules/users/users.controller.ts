import { Request, Response } from "express";
import { users } from "../../db/schemas/auth";
import { auth } from "../../auth";
import { partialUpdateUserSchema } from "./users.validator";
import { errorResponse, successResponse } from "../../lib/response";
import { fromNodeHeaders } from "better-auth/node";

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

    const updatedUserTest = await auth.api.updateUser({
      body: {
        ...allowedUpdates,
        image: allowedUpdates.image ?? undefined,
      },
      headers: fromNodeHeaders(req.headers),
      asResponse: true,
    });

    console.log({ updatedUserTest });

    return successResponse(res, "User updated successfully", {
      ...allowedUpdates,
    });
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
