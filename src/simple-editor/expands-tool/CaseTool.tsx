import { ToolbarItem } from "../components/toolbar/uikit";
import { createTextNode } from "../utils";
import { ToolProps } from "../components/toolbar/tool/tool";

export const CaseTool: React.FC<ToolProps> = (props) => {
  const { selection } = props;
  const onClick = () => {
    let content = selection?.getRangeAt()?.toString();
    if (content) {
      content =
        content === content.toLowerCase()
          ? content.toUpperCase()
          : content.toLocaleLowerCase();
      selection?.deleteContents();
      selection?.insertNode(createTextNode(content));
    }
  };
  return (
    <ToolbarItem onClick={onClick}>
      <span>Aa</span>
    </ToolbarItem>
  );
};

CaseTool.displayName = "CaseTool";
