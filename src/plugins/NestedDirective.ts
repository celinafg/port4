import { visit } from "unist-util-visit";
import { toHast } from "mdast-util-to-hast";
import type { ContainerDirective } from "mdast-util-directive";
import type { Node, Parent } from "unist";

export default function nestedDirective() {
  return (tree: Node) => {
    visit(
      tree,
      "containerDirective",
      (node: ContainerDirective, index, parent: Parent) => {
        if (
          node.children.length === 1 &&
          node.children[0].type === "paragraph" &&
          (node.children[0] as any).children[0].value === ":::"
        ) {
          // If the node contains only ':::', remove it
          parent.children.splice(index, 1);
        } else {
          processNode(node);
        }
      }
    );
  };
}

function processNode(node: ContainerDirective) {
  const data = node.data || (node.data = {});
  data.hName = "div";

  const attributes = node.attributes || {};
  if (attributes.class) {
    attributes.className = attributes.class.split(" ").join(" ");
    delete attributes.class;
  }

  data.hProperties = {
    ...attributes,
  };

  const hastChildren = node.children.map((child) => {
    if ((child as ContainerDirective).type === "containerDirective") {
      processNode(child as ContainerDirective);
      return toHast(child as any);
    }
    return toHast(child as any);
  });

  data.hChildren = hastChildren.filter(Boolean);
}
