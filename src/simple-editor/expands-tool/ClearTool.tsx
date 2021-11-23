import { ToolProps } from "../components/toolbar/tool/tool";
import { ToolbarItem } from "../components/toolbar/uikit";
import { NodeName, NodeType } from "../constant";
import { createHTMLElement, getAllTextNodeFromElement } from "../utils";

export const ClearTool: React.FC<ToolProps> = (props) => {
  const { selection, editorContent } = props;

  const onLabelClick = () => {
    let processingElement: ParentNode | HTMLElement | null =
      selection?.getCommonAncestorContainer() as ParentNode;
    let nodeType = processingElement?.nodeType;
    let clearListNodeName = [
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
    let whiteListNodeName = [
      NodeName.TABLE,
      NodeName.IMAGE,
      NodeName.TBODY,
      NodeName.TD,
      NodeName.TH,
      NodeName.THEAD,
      NodeName.TR,
    ];
    if (nodeType === NodeType.TEXT) {
      processingElement = processingElement?.parentNode;
    }

    if (processingElement === editorContent?.getEditorBody()) return;

    // 当节点是table、img时不格式化
    if (whiteListNodeName.includes(processingElement?.nodeName as NodeName))
      return;

    // 找到非clearNodeName的父元素为止
    while (true) {
      const parentElement = processingElement?.parentElement as HTMLElement;
      if (clearListNodeName.includes(parentElement?.nodeName as NodeName)) {
        processingElement = parentElement;
        continue;
      }
      break;
    }
    // 获取到上一步获取到的元素下的所有文本节点，替换成<font>文本</font>
    const textNodes = getAllTextNodeFromElement(processingElement);
    processingElement?.replaceChildren(...textNodes);

    if (clearListNodeName.includes(processingElement?.nodeName as NodeName)) {
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
