import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkDirective from "remark-directive";
import sectionizePlugin from "./sectionizePlugin";
import directive from "./src/plugins/directive";
import nestedDirective from "./src/plugins/NestedDirective";

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkDirective, directive, nestedDirective],
    rehypePlugins: [],
  },
});
