import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkDirective from "remark-directive";
import sectionizePlugin from "./sectionizePlugin";
import directive from "./src/plugins/directive";
import directiveHighlight from "./src/plugins/Highlight";
import directiveBreadcrumb from "./src/plugins/Breadcrumb";
import directiveTabs from "./src/plugins/Tabs";
import directiveFeatureCard from "./src/plugins/FeatureCard";
import directiveRowColumnLayout from "./src/plugins/RowColumnLayout";
import nestedDirective from "./src/plugins/NestedDirective";
import fullWidthDirective from "./src/plugins/FullWidthDirective";
import {
  numberedListDirective,
  numberedItemDirective,
} from "./src/plugins/NumberedItem";

export default defineConfig({
  integrations: [mdx()],
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
      numberedItemDirective,
      numberedListDirective,
    ],
    rehypePlugins: [],
  },
});
