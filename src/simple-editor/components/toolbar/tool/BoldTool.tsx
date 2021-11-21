import { BaseToolFactory } from "./BaseToolFactory";
import { ToolProps } from "./tool";

export const BoldTool: React.FC<ToolProps> = (props) => {
  return (
    <BaseToolFactory {...props} label={<span>B</span>} elementTag="strong" />
  );
};

BoldTool.displayName = "BoldTool";
