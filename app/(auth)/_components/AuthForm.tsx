"use client";

import { GoogleSignInBtn } from "@/components/GoogleSignInBtn";
import { H3 } from "@/components/H3";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { signInAction, signUpAction } from "../actions";
import { LoaderCircleIcon } from "lucide-react";

type AuthFormProps = {
  currentPage: "sign-up" | "sign-in";
};

export const AuthForm = ({ currentPage }: AuthFormProps) => {
  const [state, formAction, isPending] = useActionState(
    currentPage === "sign-up" ? signUpAction : signInAction,
    undefined
  );

  const isSignInPage = currentPage === "sign-in";

  console.log(state);

  return (
    <div className="flex flex-col gap-10">
      {/* HEADER */}
      <div className="w-full flex flex-col gap-1">
        <H3>{isSignInPage ? "Sign In" : "Sign Up"}</H3>
        <p className="text-text-secondary font-normal">
          {isSignInPage
            ? " Log In to Access Your Account"
            : "Create Your Account Now"}
        </p>
      </div>

      {/* FORM */}
      <form className="space-y-4" action={formAction}>
        {!isSignInPage && (
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
            />
            {state?.fieldErrors?.username && (
              <p className="text-sm text-red-700">
                {state.fieldErrors.username}
              </p>
            )}
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="Enter your email" />
          {state?.fieldErrors?.email && (
            <p className="text-sm text-red-700">{state.fieldErrors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          {state?.fieldErrors?.password && (
            <p className="text-sm text-red-700">{state.fieldErrors.password}</p>
          )}
        </div>

        <Button disabled={isPending} className="w-full">
          {currentPage === "sign-in" ? "Sign In" : "Sign Up"}

          {isPending && <LoaderCircleIcon className="animate-spin" />}
        </Button>

        <div className="flex items-center gap-1 text-sm">
          {isSignInPage ? (
            <>
              <p>Don&apos;t have an account?</p>
              <Link href="/sign-up" className="text-primary hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <Link href="/sign-in" className="text-primary hover:underline">
                Sign In
              </Link>
            </>
          )}
        </div>
      </form>

      {/* DIVIDER */}
      <div className="relative w-full">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm bg-foreground px-2">
          OR
        </span>
        <div className="w-full border border-border" />
      </div>
      <GoogleSignInBtn />
    </div>
  );
};
