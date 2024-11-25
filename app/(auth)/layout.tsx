import { Brand } from "@/components/Brand";

type AutLayoutProps = {
  children: React.ReactNode;
};

const AutLayout = ({ children }: AutLayoutProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center p-5">
      <Brand />

      <div className="relative min-w-[454px]">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-primary w-[138px] h-[138px] rounded-full blur-[180px] -z-10"></div>

        <div className="w-full bg-foreground rounded-2xl p-10 border-t border-t-border-light">
          {children}
        </div>

        <div className="absolute top-full right-0 translate-x-1/2 -translate-y-1/2 bg-primary w-[100px] h-[100px] rounded-full blur-[180px] -z-10"></div>
      </div>
    </div>
  );
};
export default AutLayout;
