import Link from "next/link";

import { DEMOS } from "@/configs/demos";

export default function Page() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 not-prose">
      {DEMOS.map(({ title, href }) => {
        return (
          <li key={href} className="">
            <Link href={href}>
              <p>{title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
