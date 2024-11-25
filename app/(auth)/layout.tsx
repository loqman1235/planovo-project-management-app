import { Brand } from "@/components/Brand";

type AutLayoutProps = {
  children: React.ReactNode;
};

const AutLayout = ({ children }: AutLayoutProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center">
      <Brand />

      <div className="min-w-[454px] bg-foreground rounded-xl p-10">
        {children}
      </div>
    </div>
  );
};
export default AutLayout;
