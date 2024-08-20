import { ReactNode } from "react";
import { Link } from "lucide-react";

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}

export const H2 = ({ children }: { children: ReactNode }) => {
  const anchor = getAnchor(children as string);
  const link = `#${anchor}`;

  return (
    <h2 className="relative">
      <span className="sr-only -top-28" id={anchor}></span>

      <a href={link} className="group not-prose relative">
        <Link className="hidden absolute top-1/2 -translate-y-1/2 -translate-x-2 right-full md:group-hover:inline-block"></Link>

        {children}
      </a>
    </h2>
  );
};
