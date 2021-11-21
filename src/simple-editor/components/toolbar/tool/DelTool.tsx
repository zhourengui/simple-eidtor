import { BaseToolFactory } from "./BaseToolFactory";
import { ToolProps } from "./tool";

export const DelTool: React.FC<ToolProps> = (props) => {
  return <BaseToolFactory {...props} label={<del>D</del>} elementTag="del" />;
};

DelTool.displayName = "DelTool";
