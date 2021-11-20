import { EditorSelection } from "../../../selection";
import { ToolbarItem } from "../uikit";

export interface UploadToolProps {
  selection?: EditorSelection;
}

export const UploadTool: React.FC<UploadToolProps> = (props) => {
  return (
    <ToolbarItem>
      <span>Upload</span>
    </ToolbarItem>
  );
};

UploadTool.displayName = "UploadTool";
