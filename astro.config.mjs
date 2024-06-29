import sectionizePlugin from "./sectionizePlugin";
import mdx from "@astrojs/mdx";
import myRemarkShortcodePlugin from "./src/plugins/myRemarkShortcode";
import directive from "./src/plugins/directive";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";

export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [
        remarkDirective,
        directive,
        sectionizePlugin,
        myRemarkShortcodePlugin,
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkDirective,
      directive,
      sectionizePlugin,
      myRemarkShortcodePlugin,
    ],
    rehypePlugins: [],
    // syntaxHighlight: 'shiki'
    // syntaxHighlight: 'prism'
  },
});
