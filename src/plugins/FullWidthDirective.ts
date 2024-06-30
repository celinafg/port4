import { visit } from "unist-util-visit";
import { h } from "hastscript";

export default function fullWidthDirective() {
  return (tree) => {
    visit(tree, "containerDirective", (node) => {
      if (node.name === "fullwidth") {
        const data = node.data || (node.data = {});

        data.hName = "div";
        data.hProperties = {
          className: "full-width",
        };

        const contentNode = h(
          "div",
          { className: "content" },
          node.children.map((child) =>
            h(child.type, child.attributes, child.children)
          )
        );

        data.hChildren = [contentNode];
      }
    });
  };
}
