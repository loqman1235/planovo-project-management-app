import { ZapIcon } from "lucide-react";
import Link from "next/link";

export const Brand = () => {
  return (
    <Link className="flex items-center gap-5 w-fit" href="/">
      <span className="w-7 h-7 rounded-md flex items-center justify-center bg-primary-gradient">
        <ZapIcon className="size-5 text-white" />
      </span>
      <span className="text-text-primary text-xl font-bold tracking-tight">
        Planovo
      </span>
    </Link>
  );
};
