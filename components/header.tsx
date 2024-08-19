import Link from "next/link";
import { Menu } from "lucide-react";

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
    name: "Demo",
    href: "/demo",
  },
  {
    name: "Resources",
    href: "/resources",
  },
];

export function Header() {
  return (
    <header className="static top-0 z-50 flex-shrink-0 py-4 md:sticky">
      <div className="container flex flex-col items-start justify-between px-6 mx-auto md:flex-row md:items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-l font-bold md:text-xl"
        >
          WebXR Tutorial
        </Link>

        <nav className="grid grid-flow-col gap-4 mx-auto mt-6 md:mt-0 auto-cols-auto md:auto-rows-auto md:gap-8 lg:gap-12">
          {navs.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className="text-foreground py-4 transition-colors hover:text-foreground"
            >
              {name}
            </Link>
          ))}
        </nav>

        <div>
          <Menu></Menu>
        </div>
      </div>
    </header>
  );
}
