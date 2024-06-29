import type { ContainerDirective } from "mdast-util-directive";

function processCard(node: any) {
  node.data = node.data ?? {};
  node.data.hName = "section";
  node.data.hProperties = {
    className: ["sc-card", node.name + "-content"],
  };
}

export default processCard;
