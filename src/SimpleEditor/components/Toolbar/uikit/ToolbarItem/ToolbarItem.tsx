import { ReactElement } from "react";
import "./style.scss";

export interface ToolbarItemProps {
  children: ReactElement;
  onClick?(): void;
}

const ToolbarItem: React.FC<ToolbarItemProps> = (props) => {
  const { children, onClick } = props;
  return (
    <div className="toolbar-item" onClick={onClick}>
      {children}
    </div>
  );
};

export default ToolbarItem;
