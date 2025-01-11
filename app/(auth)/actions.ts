"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { signInSchema, signUpSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

type previousState =
  | {
      fieldErrors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

export const signUpAction = async (
  previousState: previousState,
  formData: FormData
): Promise<previousState> => {
  const parsedFields = signUpSchema.safeParse(Object.fromEntries(formData));

  if (!parsedFields.success) {
    return {
      fieldErrors: parsedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = parsedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        fieldErrors: {
          email: ["Email already in use"],
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const signInAction = async (
  previousState: unknown,
  formData: FormData
) => {
  const parsedFields = signInSchema.safeParse(Object.fromEntries(formData));

  if (!parsedFields.success) {
    return {
      fieldErrors: parsedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/callback",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            fieldErrors: { password: ["Invalid credentials"] },
          };
      }
    }

    throw error;
  }
};

export const githubSignInAction = async () => {
  await signIn("github", {
    redirectTo: "/callback",
  });
};

export const googleSignInAction = async () => {
  await signIn("google", {
    redirectTo: "/callback",
  });
};
