import type { MDXComponents } from "mdx/types";

import { H2 } from "@/components/ui/h2";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <H2>{children}</H2>,
    ...components,
  };
}
