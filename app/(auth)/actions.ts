"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import {
  signInSchema,
  SignInSchemaType,
  signUpSchema,
  SignUpSchemaType,
} from "@/lib/validations";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const signUpAction = async (
  previousState: unknown,
  data: SignUpSchemaType
) => {
  const parsedFields = signUpSchema.safeParse(data);

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

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    console.error(error);
  }
};

export const signInAction = async (
  previousState: unknown,
  data: SignInSchemaType
) => {
  const parsedFields = signInSchema.safeParse(data);

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
      redirectTo: "/",
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
    redirectTo: "/",
  });
};

export const googleSignInAction = async () => {
  await signIn("google", {
    redirectTo: "/",
  });
};

export const signOutAction = async () => {
  await signOut();
};
