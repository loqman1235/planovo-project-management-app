"use client";

import { Button } from "./ui/button";
import { signOutAction } from "@/app/(auth)/actions";

export const SignOutBtn = () => {
  return <Button onClick={() => signOutAction()}>Sign Out</Button>;
};
