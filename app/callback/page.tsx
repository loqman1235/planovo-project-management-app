import React from "react";
import { LoaderCircle } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDefaultWorkspace } from "@/lib/workspace";
import { headers } from "next/headers";

const CallbackPage = async () => {
  const session = await auth();
  const headerList = await headers();
  const currentPath = headerList.get("x-current-path");

  if (session?.user && session.user.id) {
    if (currentPath === "/callback") {
      const defaultWorkspace = await getDefaultWorkspace(session.user.id);

      if (defaultWorkspace) {
        redirect(`/workspaces/${defaultWorkspace.id}`);
      }
    }
  } else {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col gap-5 items-center justify-center p-4">
      {/* Loading spinner */}
      <LoaderCircle className="size-6 text-text-primary animate-spin" />
      <p className="text-text-primary text-sm">Redirecting...</p>
    </div>
  );
};

export default CallbackPage;
