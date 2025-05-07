import { z } from 'zod';
export const RepositorySchema = z.object({
  name: z.string(),
  url: z.string().url(),
  username: z.string().optional(),
  password: z.string().optional(),
});

export type Repository = z.infer<typeof RepositorySchema>;
