import { EditorSelection } from "../../selection";
import { LinkTool } from "./tool";

export interface ToolbarProps {
  selection?: EditorSelection;
  expands?: React.FC<any>[];
}

const Toolbar = (props: ToolbarProps) => {
  const { selection, expands = [] } = props;
  return (
    <div className="toolbar">
      {[LinkTool, ...expands].map((Tool) => (
        <div key={Tool.displayName}>{Tool({ selection })}</div>
      ))}
    </div>
  );
};

export default Toolbar;
