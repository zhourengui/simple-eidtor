import { EditorSelection } from "../../selection";
import { LinkTool, ClearTool, CaseTool, TableTool, UploadTool } from "./tool";
import "./index.scss";

export interface ToolbarProps {
  selection?: EditorSelection;
  expands?: React.FC<any>[];
}

const Toolbar = (props: ToolbarProps) => {
  const { selection, expands = [] } = props;
  return (
    <div className="toolbar">
      {[LinkTool, ClearTool, CaseTool, TableTool, UploadTool, ...expands].map(
        (Tool) => (
          <div key={Tool.displayName}>{Tool({ selection })}</div>
        )
      )}
    </div>
  );
};

export default Toolbar;
