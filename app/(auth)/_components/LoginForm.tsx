"use client";

import { H3 } from "@/components/H3";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import Link from "next/link";

import { LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchemaType } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInAction } from "../actions";
import { startTransition, useActionState } from "react";

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    undefined
  );

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    startTransition(() => formAction(data));
  };

  return (
    <div className="flex flex-col gap-10">
      {/* HEADER */}
      <div className="w-full flex flex-col gap-1">
        <H3>Sign In</H3>
        <p className="text-text-secondary font-normal">
          Sign in to your account
        </p>
      </div>

      {/* FORM */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

          {state?.fieldErrors.email && (
            <p className="text-sm text-destructive">
              {state.fieldErrors.email}
            </p>
          )}
          {state?.fieldErrors.password && (
            <p className="text-sm text-destructive">
              {" "}
              {state.fieldErrors.password}
            </p>
          )}

          <Button disabled={isPending} className="w-full">
            Sign In
            {isPending && <LoaderCircleIcon className="animate-spin" />}
          </Button>

          <div className="flex items-center gap-1 text-sm">
            <p>Don&apos;t have an account yet?</p>
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
