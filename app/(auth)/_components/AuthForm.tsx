"use client";

import { H3 } from "@/components/H3";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type AuthFormProps = {
  currentPage: "sign-up" | "sign-in";
};

export const AuthForm = ({ currentPage }: AuthFormProps) => {
  const isSignInPage = currentPage === "sign-in";
  const form = useForm();

  const onSubmit = async () => {
    console.log("submit");
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
          <FormField
            control={form.control}
            name="username"
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
        </form>
      </Form>
    </div>
  );
};
