import { visit } from "unist-util-visit";
import { toHast } from "mdast-util-to-hast";
import type { ContainerDirective } from "mdast-util-directive";

export default function nestedDirective() {
  return (tree: any) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      const data = node.data || (node.data = {});

      data.hName = "div";

      const attributes = node.attributes || {};
      if (attributes.class) {
        // Ensure multiple class names are handled correctly
        attributes.className = attributes.class.split(" ").join(" ");
        delete attributes.class;
      }

      data.hProperties = {
        ...attributes,
      };
      // @ts-ignore
      const hastChildren = node.children.map(toHast);

      data.hChildren = hastChildren;
    });
  };
}
