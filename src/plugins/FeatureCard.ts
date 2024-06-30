import { visit } from "unist-util-visit";
import { h } from "hastscript";
import { toHast } from "mdast-util-to-hast";

export default function directiveFeatureCard() {
  return (tree) => {
    visit(tree, "containerDirective", (node) => {
      if (node.name === "feature-card") {
        const data = node.data || (node.data = {});
        data.hName = "div";
        data.hProperties = { className: "feature-card" };

        const titleNode = node.children.find(
          (child) => child.type === "heading" && child.depth === 3
        );
        const contentNodes = node.children.filter(
          (child) => child.type !== "heading"
        );
        const cardTitle = titleNode
          ? h(
              "h3",
              { className: "feature-card-title" }, // @ts-ignore

              toHast(titleNode).children
            )
          : null;
        const cardContent = h(
          "div",
          { className: "feature-card-content" },
          contentNodes.map(toHast)
        );

        data.hChildren = [cardTitle, cardContent];
      }
    });
  };
}
