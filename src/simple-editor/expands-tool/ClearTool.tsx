import { ToolProps } from "../components/toolbar/tool/tool";
import { ToolbarItem } from "../components/toolbar/uikit";
import { NodeName } from "../constant";
import { getAllTextNodeFromElement } from "../utils";

export const ClearTool: React.FC<ToolProps> = (props) => {
  const { selection, editorContent } = props;

  const onLabelClick = () => {
    let processingElement: ParentNode | null =
      selection?.getCommonAncestorContainer() as ParentNode;
    let nodeType = processingElement?.nodeType;
    let clearNodeName = [
      NodeName.FONT,
      NodeName.A,
      NodeName.H1,
      NodeName.H2,
      NodeName.H3,
      NodeName.H4,
      NodeName.H5,
      NodeName.H6,
      NodeName.DEL,
      NodeName.EM,
      NodeName.U,
      NodeName.STRONG,
    ];
    if (nodeType === 3) {
      processingElement = processingElement?.parentNode;
    }

    if (processingElement === editorContent?.getEditorBody()) return;

    while (true) {
      const parentElement = processingElement?.parentElement as ParentNode;
      if (clearNodeName.includes(parentElement?.nodeName as NodeName)) {
        processingElement = parentElement;
        continue;
      }
      processingElement = parentElement;
      break;
    }

    const textNodes = getAllTextNodeFromElement(processingElement);
    processingElement?.replaceChildren(...textNodes);
  };
  return (
    <ToolbarItem>
      <span onClick={onLabelClick}>Clear</span>
    </ToolbarItem>
  );
};

ClearTool.displayName = "ClearTool";
