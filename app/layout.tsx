import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getDefaultWorkspace } from "@/lib/workspace";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Planovo",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const headerList = await headers();
  const currentPath = headerList.get("x-current-path");

  if (session?.user && session.user.id) {
    if (currentPath === "/" || currentPath === "/callback") {
      const defaultWorkspace = await getDefaultWorkspace(session.user.id);

      if (defaultWorkspace) {
        redirect(`/workspaces/${defaultWorkspace.id}`);
      }
    }
  }

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
