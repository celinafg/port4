import { visit } from "unist-util-visit";
import slugify from "slugify";
import { findAfter } from "unist-util-find-after";
const MAX_HEADING_DEPTH = 2;

function sectionizePlugin() {
  return (tree) => {
    for (let depth = MAX_HEADING_DEPTH; depth > 0; depth--) {
      visit(
        tree,
        (node) => node.type === "heading" && node.depth === depth,
        sectionize
      );
    }
  };
}

function sectionize(node, index, parent) {
  const start = node;
  const startIndex = index;
  const depth = start.depth;

  const isEnd = (node) => node.type === "heading" && node.depth <= depth;
  const end = findAfter(parent, start, isEnd);
  const endIndex = parent.children.indexOf(end);

  const between = parent.children.slice(
    startIndex,
    endIndex > 0 ? endIndex : undefined
  );

  const sectionId = slugify(
    start.children
      .map((child) => child.value)
      .join("-")
      .toLowerCase(),
    {
      lower: true,
      strict: true,
    }
  );

  const section = {
    type: "section",
    depth: depth,
    children: between,
    data: {
      hName: "section",
      hProperties: {
        id: sectionId,
      },
    },
  };

  parent.children.splice(startIndex, section.children.length, section);
}

export default sectionizePlugin;
