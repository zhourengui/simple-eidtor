import { ToolbarItem } from "../components/toolbar/uikit";
import { ToolProps } from "../components/toolbar/tool/tool";
import { setAllTextNodeFromElement } from "../utils";

export const CaseTool: React.FC<ToolProps> = (props) => {
  const { selection } = props;
  const onClick = () => {
    const content = selection?.getContent();
    if (content) {
      selection?.deleteContents();
      const newNode = setAllTextNodeFromElement(content, (text: string) =>
        text === text.toLowerCase()
          ? text.toUpperCase()
          : text.toLocaleLowerCase()
      );
      selection?.insertNode(newNode);
    }
  };
  return (
    <ToolbarItem onClick={onClick}>
      <span>Aa</span>
    </ToolbarItem>
  );
};

CaseTool.displayName = "CaseTool";
