import { ToolbarItem } from "../uikit";
import { createTextNode } from "../../../utils";
import { ToolProps } from "./tool";

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
