import type { Image, Paragraph, RootContent } from "mdast";

const processImage = (node: any, index: number, parent: any, file: any) => {
  const url = node.attributes.id;

  if (typeof url !== "string") {
    file.fail("Expected `url` attribute on image directive", node);
  }

  const img: Image = {
    type: "image",
    url,
    alt: node.attributes.alt || undefined,
    title: null,
  };

  const paragraph: Paragraph = {
    type: "paragraph",
    children: [img],
  };

  const siblings: RootContent[] = parent.children;
  siblings.splice(index, 1, paragraph);
};

export default processImage;
