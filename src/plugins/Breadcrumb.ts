import { h } from "hastscript";
import { visit } from "unist-util-visit";

export default function directiveBreadcrumb() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name !== "breadcrumb") return;

        const data = node.data || (node.data = {});
        data.hName = "nav";
        data.hProperties = { className: "breadcrumb" };

        const items = node.children.map((child) =>
          h("li", {}, h(child.type, child.attributes, child.children))
        );
        node.data.hChildren = [h("ol", {}, items)];
      }
    });
  };
}
