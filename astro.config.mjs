import sectionizePlugin from "./sectionizePlugin";
import mdx from "@astrojs/mdx";
import directive from "./src/plugins/directive";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import directiveHighlight from "./src/plugins/Highlight";
import directiveBreadcrumb from "./src/plugins/Breadcrumb";
import directiveTabs from "./src/plugins/Tabs";
import directiveFeatureCard from "./src/plugins/FeatureCard";
import directiveRowColumnLayout from "./src/plugins/RowColumnLayout";
import nestedDirective from "./src/plugins/NestedDirective";
import fullWidthDirective from "./src/plugins/FullWidthDirective";
export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [
        remarkDirective,
        directive,
        sectionizePlugin,
        directiveHighlight,
        directiveBreadcrumb,
        directiveTabs,
        directiveFeatureCard,
        directiveRowColumnLayout,
        nestedDirective,
        fullWidthDirective,
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkDirective,
      directive,
      sectionizePlugin,
      directiveHighlight,
      directiveBreadcrumb,
      directiveTabs,
      directiveFeatureCard,
      directiveRowColumnLayout,
      nestedDirective,
      fullWidthDirective,
    ],
    rehypePlugins: [],
  },
});
