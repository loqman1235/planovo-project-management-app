import { githubSignInAction } from "@/app/(auth)/actions";
import { RiGithubFill } from "react-icons/ri";

export const GithubSignInBtn = () => {
  return (
    <form action={githubSignInAction}>
      <button className="w-full p-2 bg-gradient-to-b from-white to-[#E4E4E6] rounded-md flex items-center justify-center gap-2">
        <span className="text-black">
          <RiGithubFill className="size-5" />
        </span>
        <span className="text-[#161618] text-sm tracking-[-0.18px] font-semibold">
          Continue with Github
        </span>
      </button>
    </form>
  );
};
