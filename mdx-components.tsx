import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { isExternalUrl } from "@/lib/isExternalUrl";
import { H2 } from "@/components/ui/h2";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children }) => {
      return href ? (
        <Link href={href} target={isExternalUrl(href) ? "_blank" : "_self"}>
          {children}
        </Link>
      ) : (
        <a>{children}</a>
      );
    },
    h2: ({ children }) => <H2>{children}</H2>,
    ...components,
  };
}
