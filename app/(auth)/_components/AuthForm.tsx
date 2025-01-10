"use client";

import { GoogleSignInBtn } from "@/components/GoogleSignInBtn";
import { H3 } from "@/components/H3";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchema,
  signUpSchema,
  SignInSchemaType,
  SignUpSchemaType,
} from "@/lib/validations";

type AuthFormProps = {
  currentPage: "sign-up" | "sign-in";
};

export const AuthForm = ({ currentPage }: AuthFormProps) => {
  const isSignInPage = currentPage === "sign-in";

  const form = useForm<SignInSchemaType | SignUpSchemaType>({
    resolver: zodResolver(isSignInPage ? signInSchema : signUpSchema),
    defaultValues: isSignInPage
      ? {
          email: "",
          password: "",
        }
      : {
          username: "",
          email: "",
          password: "",
        },
  });

  const onSubmit = async (data: SignInSchemaType | SignUpSchemaType) => {
    if (isSignInPage) {
      console.log(data);
    } else {
      console.log(data);
    }
  };

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {!isSignInPage && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">
            {currentPage === "sign-in" ? "Sign In" : "Sign Up"}
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
      </Form>

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
