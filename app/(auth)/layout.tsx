import { auth } from "@/auth";
import { Brand } from "@/components/Brand";
import { redirect } from "next/navigation";
import { GoogleSignInBtn } from "./_components/GoogleSignInBtn";

type AutLayoutProps = {
  children: React.ReactNode;
};

const AutLayout = async ({ children }: AutLayoutProps) => {
  // const session = await auth();

  // if (session && session.user) redirect("/");

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center p-5">
      <Brand />

      <div className="relative min-w-[454px]">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-primary w-[138px] h-[138px] rounded-full blur-[180px] -z-10"></div>

        <div className="w-full bg-foreground rounded-2xl p-10 border-t border-t-border-light flex flex-col gap-10">
          {children}
          <div className="relative w-full">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm bg-foreground px-2">
              OR
            </span>
            <div className="w-full border border-border" />
          </div>
          <GoogleSignInBtn />
        </div>

        <div className="absolute top-full right-0 translate-x-1/2 -translate-y-1/2 bg-primary w-[100px] h-[100px] rounded-full blur-[180px] -z-10"></div>
      </div>
    </div>
  );
};
export default AutLayout;
