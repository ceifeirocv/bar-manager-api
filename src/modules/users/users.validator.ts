import { createUpdateSchema } from "drizzle-zod";
import { users } from "../../db/schemas/auth";

export const updateUserSchema = createUpdateSchema(users);

export const partialUpdateUserSchema = updateUserSchema.pick({
  image: true,
  name: true,
  displayUsername: true,
});
