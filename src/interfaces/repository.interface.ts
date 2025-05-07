import { z } from "zod";
export const RepositorySchema = z.object({
  name: z.string(),
  url: z.string().url(),
  username: z.string().optional(),
  password: z.string().optional(),
});

export type Repository = z.infer<typeof RepositorySchema>;

export interface HelmAppVersion {
  name: string;
  version: string;
  app_version: string;
  description: string;
}
