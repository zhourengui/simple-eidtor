import { EditorSelection } from "../../selection";
import { LinkTool, ClearTool, CaseTool, TableTool, UploadTool } from "./tool";
import { EditorContent } from "../../editor-content";

export interface ToolbarProps {
  selection?: EditorSelection;
  editorContent?: EditorContent;
  expands?: React.FC<any>[];
}

const Toolbar = (props: ToolbarProps) => {
  const { selection, editorContent, expands = [] } = props;
  return (
    <div className="toolbar">
      {[LinkTool, ClearTool, CaseTool, TableTool, UploadTool, ...expands].map(
        (Tool) => (
          <div key={Tool.displayName}>{Tool({ selection, editorContent })}</div>
        )
      )}
    </div>
  );
};

export default Toolbar;
