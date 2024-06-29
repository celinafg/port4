import type { VFile } from "vfile";
import type { Blockquote, ListItem } from "mdast";
import type { Element } from "hast";
import type { ContainerDirective } from "mdast-util-directive";

import { toHast } from "mdast-util-to-hast";

function processNotice(
  node: any,
  index: number,
  parent: Blockquote | any | ListItem | ContainerDirective,
  file: VFile
) {
  const allowedTypes = ["warning", "important", "note", "tip", "info"];
  const firstElementKey = Object.keys(node.attributes)[0];
  let currentType: string | undefined = "";

  if (Object.hasOwn(node.attributes, "title")) {
    currentType = node.attributes.title;
  } else if (allowedTypes.indexOf(firstElementKey) !== -1) {
    currentType = firstElementKey;
  } else {
    file.fail("notice directive: invalid type", node);
  }

  node.data = node.data ?? {};
  node.data.hName = "section";
  node.data.hProperties = {
    className: "sc-notice " + currentType,
  };

  const icon: Element = {
    type: "element",
    tagName: "svg",
    properties: {
      className: "notice-icon",
      variant: currentType,
    },
    children: [],
  };

  const content: Element = {
    type: "element",
    tagName: "p",
    properties: {
      className: node.name + "-icon",
    },
    children: [
      {
        type: "text",
        value: currentType,
      },
    ],
  };

  node.data.hChildren = [
    {
      type: "element",
      tagName: "div",
      properties: {
        className: "notice-title",
      },
      children: [icon, content],
    },
    {
      type: "element",
      tagName: "div",
      properties: {
        className: "notice-content",
      },
      children: node.children.map(toHast),
    },
  ];
}

export default processNotice;
