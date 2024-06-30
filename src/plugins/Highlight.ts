import { h } from "hastscript";
import { visit } from "unist-util-visit";

export default function directiveHighlight() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      const value = node.value;
      const regex = /:highlight{([^}]+)}/g;
      let match;
      const newChildren = [];

      let lastIndex = 0;
      while ((match = regex.exec(value)) !== null) {
        const textBefore = value.slice(lastIndex, match.index);
        if (textBefore) {
          newChildren.push({
            type: "text",
            value: textBefore,
          });
        }

        newChildren.push({
          type: "element",
          tagName: "mark",
          properties: { className: "highlight" },
          children: [{ type: "text", value: match[1] }],
        });

        lastIndex = regex.lastIndex;
      }

      const textAfter = value.slice(lastIndex);
      if (textAfter) {
        newChildren.push({
          type: "text",
          value: textAfter,
        });
      }

      if (newChildren.length) {
        parent.children.splice(index, 1, ...newChildren);
      }
    });
  };
}
