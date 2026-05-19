import { z } from "zod";

export const getByIdSchema = z.object({
  id: z.uuid()
});

export type GetByIdCommand = z.infer<typeof getByIdSchema>;