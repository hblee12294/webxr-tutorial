import Link from "next/link";
import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";

import { DEMOS } from "@/configs/demos";
import { isExternalUrl } from "@/lib/isExternalUrl";

export default function Page() {
  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 not-prose">
      {DEMOS.map(({ title, href, cover }) => {
        const isExternal = isExternalUrl(href);

        return (
          <li key={href}>
            <Link
              href={href}
              target={isExternalUrl(href) ? "_blank" : "_self"}
              className="grid gap-2"
            >
              <Image
                src={cover}
                width={1280}
                height={720}
                alt={title}
                className="rounded-lg border"
              />

              <h2 className="text-lg flex gap-2 items-center justify-between">
                {title}

                {isExternal && (
                  <SquareArrowOutUpRight size={18}></SquareArrowOutUpRight>
                )}
              </h2>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
