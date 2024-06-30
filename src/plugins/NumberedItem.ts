// @ts-nocheck
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import type { Node } from "unist";
import type { ContainerDirective } from "mdast-util-directive";
import { toHast } from "mdast-util-to-hast";

function isContainerDirective(node: Node): node is ContainerDirective {
  return "name" in node && node.name !== undefined && "children" in node;
}

export function numberedListDirective() {
  return (tree) => {
    visit(tree, "containerDirective", (node) => {
      if (isContainerDirective(node) && node.name === "numbered-list") {
        const data = node.data || (node.data = {});
        data.hName = "ul";
        data.hProperties = { className: "numbered-list" };

        const hastChildren = node.children.map((child) => toHast(child));
        data.hChildren = hastChildren;
      }
    });
  };
}

export function numberedItemDirective() {
  return (tree) => {
    visit(tree, "containerDirective", (node) => {
      if (isContainerDirective(node) && node.name === "numbered-item") {
        const data = node.data || (node.data = {});
        data.hName = "li";
        data.hProperties = { className: "numbered-list-item" };

        const [numberNode, ...contentNodes] = node.children;

        const numberElement = h(
          "span",
          { className: "numbered-list-item-number" },
          toHast(numberNode).children
        );
        const contentElement = h(
          "div",
          { className: "numbered-list-item-content" },
          contentNodes.map(toHast)
        );

        data.hChildren = [numberElement, contentElement];
      }
    });
  };
}
