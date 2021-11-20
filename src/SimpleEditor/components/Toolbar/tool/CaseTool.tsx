import { EditorSelection } from "../../../selection";
import { ToolbarItem } from "../uikit";
import { createTextNode } from "../utils";

export interface CaseToolProps {
  selection?: EditorSelection;
}

export const CaseTool: React.FC<CaseToolProps> = (props) => {
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
