"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface Nav {
  name: string;
  href: string;
}

const navs: Nav[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Demos",
    href: "/demos",
  },
  {
    name: "Resources",
    href: "/resources",
  },
];

export function NavDesktop() {
  const pathname = usePathname();

  return (
    <nav className="grid grid-flow-col gap-4 md:gap-8 lg:gap-12">
      {navs.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-foreground py-4 transition-colors hover:text-foreground",
            pathname === href && "font-semibold",
          )}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}

export function NavMobile() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-6 text-lg mt-10">
      {navs.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-left text-foreground",
            pathname === href && "font-semibold",
          )}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
