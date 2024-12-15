import { cn } from "@/lib/utils";

type H4Props = {
  className?: string;
  children: string;
};

export const H4 = ({ children, className }: H4Props) => {
  return (
    <h4
      className={cn(
        "text-lg font-bold tracking-[-0.26px] text-text-primary",
        className
      )}
    >
      {children}
    </h4>
  );
};
