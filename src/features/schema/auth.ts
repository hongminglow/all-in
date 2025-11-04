import { z } from "zod";

export const createLoginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username characters must be less than 20"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(18, "Password characters must be less than 18"),
});

export type TLoginSchema = z.infer<typeof createLoginSchema>;
