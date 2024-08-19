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

export function Header() {
  return (
    <header className="static top-0 py-4 md:sticky">
      <div className="container flex flex-row items-center justify-between px-6">
        <Link href="/" className="text-l font-bold md:text-xl">
          WebXR Tutorial
        </Link>

        <div className="hidden md:block mx-auto">
          <NavDesktop></NavDesktop>
        </div>

        <div>
          <div className="md:hidden">
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
