import { visit } from "unist-util-visit";

export default function directive() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        !node.type === "textDirective" &&
        !node.type === "leafDirective" &&
        !node.type === "containerDirective"
      ) {
        return;
      }

      const data = node.data || (node.data = {});
      const hast = h(node.name, node.attributes);

      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    });
  };
}

function h(name, attributes) {
  return {
    type: "element",
    tagName: name,
    properties: attributes || {},
    children: [],
  };
}
