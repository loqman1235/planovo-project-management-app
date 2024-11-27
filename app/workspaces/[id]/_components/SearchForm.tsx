import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const SearchForm = () => {
  return (
    <form>
      <div className="relative min-w-[300px]">
        <Input className="px-12 " name="search_q" placeholder="Search..." />
        <button className="absolute top-1/2 -translate-y-1/2 left-4">
          <SearchIcon className="size-4 text-text-secondary" />
        </button>
      </div>
    </form>
  );
};
