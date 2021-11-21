import { NodeName } from "../../../constant";
import { createHTMLElement, getAllTextNodeFromElement } from "../../../utils";
import { ToolbarItem } from "../uikit";
import { ToolProps } from "./tool";

export const ClearTool: React.FC<ToolProps> = (props) => {
  const { selection, editorContent } = props;

  const onLabelClick = () => {
    let processingElement: ParentNode | null =
      selection?.getCommonAncestorContainer() as ParentNode;
    let nodeType = processingElement?.nodeType;

    if (nodeType === 3) {
      processingElement = processingElement?.parentNode;
    }

    if (processingElement === editorContent?.getEditorBody()) return;

    const textNodes = getAllTextNodeFromElement(processingElement);
    const nodeName = processingElement?.nodeName;
    processingElement?.replaceChildren(...textNodes);

    if (nodeName === NodeName.FONT || nodeName === NodeName.A) {
      processingElement?.parentElement?.replaceChild(
        createHTMLElement({
          type: "font",
          children: Array.from(processingElement.childNodes),
        }),
        processingElement
      );
    }
  };
  return (
    <ToolbarItem>
      <span onClick={onLabelClick}>Clear</span>
    </ToolbarItem>
  );
};

ClearTool.displayName = "ClearTool";
