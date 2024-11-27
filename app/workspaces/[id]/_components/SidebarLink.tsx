import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarLinkProps = {
  link: {
    text: string;
    href: string;
    icon: LucideIcon;
  };
};

export const SidebarLink = ({ link }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isLinkActive = pathname === link.href;

  const activeLinkClasses = isLinkActive
    ? "sidebar-link-gradient border-t border-t-border-light text-text-primary shadow-md"
    : "text-text-secondary";

  return (
    <li key={link.href}>
      <Link
        href={link.href}
        className={`flex items-center gap-2 py-2 px-2.5 capitalize rounded-md hover:sidebar-link-gradient hover:text-text-primary hover:shadow-md transition ${activeLinkClasses}`}
      >
        <span>
          <link.icon className="size-4" />
        </span>
        <span className="text-sm">{link.text}</span>
      </Link>
    </li>
  );
};
