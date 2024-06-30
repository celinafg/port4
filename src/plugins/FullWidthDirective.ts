import { visit } from "unist-util-visit";
import { h } from "hastscript";
import type { Node } from "unist";
import type { ContainerDirective } from "mdast-util-directive";
import { toHast } from "mdast-util-to-hast";

function isContainerDirective(node: Node): node is ContainerDirective {
  return "name" in node && node.name !== undefined && "children" in node;
}

export default function fullWidthDirective() {
  return (tree) => {
    visit(tree, "containerDirective", (node) => {
      if (isContainerDirective(node) && node.name === "full-width") {
        const data = node.data || (node.data = {});
        data.hName = "div";
        data.hProperties = { className: "full-width-background" }; //@ts-ignore

        const hastChildren = node.children.map((child) => toHast(child));
        data.hChildren = [h("div", { className: "content" }, hastChildren)];
      }
    });
  };
}
