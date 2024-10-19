import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().trim().min(6, "Minimum 6 character"),
});

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim(),
});
