import { visit } from "unist-util-visit";
import { toHast } from "mdast-util-to-hast";

function getNestingLevel(directiveName) {
  const match = directiveName.match(/^:+/);
  return match ? match[0].length : 0;
}

export default function directive() {
  return (tree) => {
    visit(
      tree,
      ["textDirective", "leafDirective", "containerDirective"],
      (node) => {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes);

        // Ensure attributes handle className correctly
        if (node.attributes && node.attributes.class) {
          node.attributes.className = node.attributes.class;
          delete node.attributes.class;
        }

        data.hName = hast.tagName;
        data.hProperties = hast.properties;

        // Function to process children based on nesting level
        const processChildren = (children, level) => {
          return children.map((child) => {
            if (child.type === "containerDirective") {
              const childLevel = getNestingLevel(child.name);
              if (childLevel > level) {
                const childData = child.data || (child.data = {});
                childData.hName = "div";

                const childAttributes = child.attributes || {};
                if (childAttributes.class) {
                  childAttributes.className = childAttributes.class
                    .split(" ")
                    .join(" ");
                  delete childAttributes.class;
                }

                childData.hProperties = {
                  ...childAttributes,
                };

                // Recursively process nested children
                if (child.children && child.children.length) {
                  childData.hChildren = processChildren(
                    child.children,
                    childLevel
                  );
                }
              }
            }
            return toHast(child);
          });
        };

        // Process the initial node's children
        const initialLevel = getNestingLevel(node.name);
        data.hChildren = processChildren(node.children, initialLevel);
      }
    );
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
