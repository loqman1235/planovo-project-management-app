import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().min(1, { message: "Email is required" }).email(),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  username: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().trim().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const createWorkspaceSchema = z.object({
  workspaceName: z
    .string()
    .trim()
    .min(1, { message: "Workspace name is required" }),
});

export type CreateWorkspaceSchemaType = z.infer<typeof createWorkspaceSchema>;

export const editWorkspaceSchema = z.object({
  workspaceName: z
    .string()
    .trim()
    .min(1, { message: "Workspace name is required" }),
});

export type EditWorkspaceSchemaType = z.infer<typeof editWorkspaceSchema>;
