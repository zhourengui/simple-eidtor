import { EditorSelection } from "../../selection";
import { EditorContent } from "../../editor-content";
import { BoldTool, UnderlineTool, DelTool, ItiltTool } from "./tool";

export interface ToolbarProps {
  selection?: EditorSelection;
  editorContent?: EditorContent;
  expands?: React.FC<any>[];
}

const Toolbar = (props: ToolbarProps) => {
  const { selection, editorContent, expands = [] } = props;
  return (
    <div className="toolbar">
      {[BoldTool, UnderlineTool, DelTool, ItiltTool, ...expands].map((Tool) => (
        <div key={Tool.displayName}>{Tool({ selection, editorContent })}</div>
      ))}
    </div>
  );
};

export default Toolbar;
