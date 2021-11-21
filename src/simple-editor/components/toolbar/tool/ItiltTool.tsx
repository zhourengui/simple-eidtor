import { BaseToolFactory } from "./BaseToolFactory";
import { ToolProps } from "./tool";

export const ItiltTool: React.FC<ToolProps> = (props) => {
  return <BaseToolFactory {...props} label={<em>I</em>} elementTag="em" />;
};

ItiltTool.displayName = "ItiltTool";
