import { ReactElement } from "react";
import "./style.scss";

export interface ToolbarItemProps {
  children: ReactElement;
}

const ToolbarItem: React.FC<ToolbarItemProps> = (props) => {
  const { children } = props;
  return <div className="toolbar-item">{children}</div>;
};

export default ToolbarItem;
