"use client";

import { createWorkspaceAction } from "@/app/workspaces/actions";
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
import {
  createWorkspaceSchema,
  CreateWorkspaceSchemaType,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

const CreateInitialWorkspaceForm = () => {
  const [state, formAction] = useActionState(createWorkspaceAction, undefined);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CreateWorkspaceSchemaType>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  const onSubmit = async (data: CreateWorkspaceSchemaType) => {
    startTransition(() => formAction(data));
  };

  useEffect(() => {
    if (state?.success) {
      router.push(state.redirectUrl);
    }
  }, [router, state?.success, state?.redirectUrl]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="workspaceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. My Workspace" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Creating..." : "Create Workspace"}
        </Button>
      </form>
    </Form>
  );
};
export default CreateInitialWorkspaceForm;
