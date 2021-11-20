import { EditorSelection } from "../../../selection";
import { ToolbarItem } from "../uikit";

export interface ClearToolProps {
  selection?: EditorSelection;
}

export const ClearTool: React.FC<ClearToolProps> = (props) => {
  return (
    <ToolbarItem>
      <span>Clear</span>
    </ToolbarItem>
  );
};

ClearTool.displayName = "ClearTool";
