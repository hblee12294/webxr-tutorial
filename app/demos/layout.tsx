import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-dvh">
      <Header></Header>

      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div className="absolute top-2 left-2 lg:top-4 lg:left-4">
          <Link href="/demos">
            <Button variant="link">
              <ChevronLeft></ChevronLeft>
              Demos
            </Button>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
