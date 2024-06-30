import { h } from "hastscript";
import { visit } from "unist-util-visit";

export default function directiveRowColumnLayout() {
  return (tree) => {
    visit(tree, "containerDirective", (node) => {
      if (node.name === "layout") {
        const layoutType = node.attributes.type || "row"; // default to row layout if type is not specified
        const data = node.data || (node.data = {});
        data.hName = "div";
        data.hProperties = { className: `layout-${layoutType}` };

        const items = node.children.map((child) =>
          h("div", { className: "layout-item" }, [
            h(child.type, child.attributes, child.children),
          ])
        );

        node.data.hChildren = items;
      }
    });
  };
}
