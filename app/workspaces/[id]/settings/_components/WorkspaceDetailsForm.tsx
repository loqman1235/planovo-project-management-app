"use client";

import { updateWorkspaceAction } from "@/app/workspaces/actions";
import { Divider } from "@/components/Divider";
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
  editWorkspaceSchema,
  EditWorkspaceSchemaType,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon } from "lucide-react";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  workspaceId: string;
  workspaceName: string;
};

export const WorkspaceDetailsForm = ({ workspaceId, workspaceName }: Props) => {
  const [state, formAction] = useActionState(updateWorkspaceAction, undefined);

  const form = useForm<EditWorkspaceSchemaType>({
    resolver: zodResolver(editWorkspaceSchema),
    defaultValues: {
      workspaceId,
      workspaceName,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: EditWorkspaceSchemaType) => {
    startTransition(() => formAction(data));
  };

  useEffect(() => {
    if (!isPending && state?.success) toast.success("Workspace updated");
  }, [isPending, state?.success]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="workspaceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text-primary">
                Workspace name
              </FormLabel>
              <FormControl>
                <Input
                  className="py-5 text-text-primary"
                  placeholder="Enter your workspace name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-5">
          <div className="w-10 h-10 rounded-[6px] bg-[#EC4899] flex items-center justify-center  font-medium text-text-primary">
            AC
          </div>

          <div className="flex flex-col gap-2">
            <FormLabel className="text-text-primary">Workspace icon</FormLabel>
            <p className="capitalize text-sm text-text-secondary !m-0">
              JPG, PNG, SVG format
            </p>
            <label
              htmlFor="icon"
              className="flex items-center justify-center gap-2 cursor-pointer bg-text-primary/5 hover:bg-text-primary/10 p-2 rounded-md text-sm"
            >
              <input type="file" id="icon" className="hidden" />

              <UploadIcon className="text-text-primary size-4" />
              <span className="text-text-primary">Upload</span>
            </label>
          </div>
        </div>

        <Divider />
        <Button disabled={isPending}>{isPending ? "Saving..." : "Save"}</Button>
      </form>
    </Form>
  );
};
