import { visit } from "unist-util-visit";
import { toHast } from "mdast-util-to-hast";

export default function nestedDirective() {
  return (tree) => {
    visit(tree, "containerDirective", (node) => {
      const { name } = node;
      const data = node.data || (node.data = {});

      data.hName = name;
      data.hProperties = {
        ...node.attributes,
        className: node.attributes?.className || "",
      };

      const hastChildren = node.children.map((child) => toHast(child));

      data.hChildren = hastChildren;
    });
  };
}
