import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export type CreateUserCommand = z.infer<typeof CreateUserSchema>;