import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
