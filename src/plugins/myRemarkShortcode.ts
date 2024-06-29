import type { Root } from "mdast";
import type { VFile } from "vfile";
import { visit } from "unist-util-visit";
import processImage from "./shortcodes/Image";
import processNotice from "./shortcodes/Notice";
import processCard from "./shortcodes/Card";

const myRemarkShortcodePlugin: import("unified").Plugin<[], Root> =
  function () {
    return (tree: Root, file: VFile) => {
      visit(
        tree,
        "containerDirective",
        (node: any, index: number, parent: any) => {
          switch (node.name) {
            case "image": {
              processImage(node, index, parent, file);
              break;
            }
            case "notice": {
              processNotice(node, index, parent, file);
              break;
            }
            case "card": {
              processCard(node);
              break;
            }
          }
        },
        true
      );
    };
  };

export default myRemarkShortcodePlugin;
