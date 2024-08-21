import Link from "next/link";

export function Footer() {
  return (
    <footer className="pt-10 pb-8">
      <div className="container flex flex-row items-center justify-between px-6">
        <div className="text-sm text-muted-foreground">
          <Link href="https://hongbinli.com" target="_blank" className="">
            Hblee
          </Link>
          &nbsp;© 2024
        </div>

        <div className="flex flex-row gap-3 items-center"></div>
      </div>
    </footer>
  );
}
