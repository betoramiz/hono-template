import { z } from "zod";

export const getByIdSchema = z.object({
  id: z.string().nonempty()
});

export type GetByIdCommand = z.infer<typeof getByIdSchema>;