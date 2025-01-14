"use client";

import { H3 } from "@/components/H3";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import Link from "next/link";

import { LoaderCircleIcon } from "lucide-react";
import { GoogleSignInBtn } from "./GoogleSignInBtn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchemaType } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useActionState } from "react";
import { signUpAction } from "../actions";

export const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    undefined
  );

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* HEADER */}
      <div className="w-full flex flex-col gap-1">
        <H3>Sign Up</H3>
        <p className="text-text-secondary font-normal">
          Create Your Account Now
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button disabled={false} className="w-full">
            Sign Up
            {false && <LoaderCircleIcon className="animate-spin" />}
          </Button>

          <div className="flex items-center gap-1 text-sm">
            <p>Already have an account?</p>
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
