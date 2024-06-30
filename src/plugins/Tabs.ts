import { h } from "hastscript";
import { visit } from "unist-util-visit";

export default function directiveTabs() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name !== "tabs") return;

        const data = node.data || (node.data = {});
        data.hName = "div";
        data.hProperties = { className: "tabs" };

        const items = node.children.map((child) =>
          h(
            "div",
            { className: "tab-item" },
            h(child.type, child.attributes, child.children)
          )
        );
        node.data.hChildren = items;
      }
    });
  };
}
