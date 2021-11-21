import { BaseToolFactory } from "./BaseToolFactory";
import { ToolProps } from "./tool";

export const UnderlineTool: React.FC<ToolProps> = (props) => {
  return <BaseToolFactory {...props} label={<u>U</u>} elementTag="u" />;
};

UnderlineTool.displayName = "UnderlineTool";
