import { FcGoogle } from "react-icons/fc";

export const GoogleSignInBtn = () => {
  return (
    <button className="w-full p-2 bg-gradient-to-b from-white to-[#E4E4E6] rounded-md flex items-center justify-center gap-2">
      <FcGoogle className="size-5" />
      <span className="text-[#161618] text-sm tracking-[-0.18px] font-semibold">
        Continue with Google
      </span>
    </button>
  );
};
