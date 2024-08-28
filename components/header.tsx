import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavDesktop, NavMobile } from "@/components/nav";
import IconGitHub from "@/components/icons/github.svg";

export function Header() {
  return (
    <header className="z-10 static top-0 py-4 backdrop-blur bg-white/80 md:sticky">
      <div className="container flex flex-row items-center justify-between px-6">
        <Link href="/" className="text-l font-bold md:text-xl leading-tight">
          WebXR Tutorial
        </Link>

        <div className="hidden md:block mx-auto">
          <NavDesktop></NavDesktop>
        </div>

        <div className="flex flex-row justify-end gap-3 items-center min-w-[150px]">
          <Link
            href="https://github.com/hblee12294/webxr-tutorial"
            target="_blank"
          >
            <IconGitHub height={22} width={22}></IconGitHub>
          </Link>

          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu size="24" />

                <span className="sr-only">Toggle navigation menu</span>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetDescription>
                    <NavMobile></NavMobile>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
