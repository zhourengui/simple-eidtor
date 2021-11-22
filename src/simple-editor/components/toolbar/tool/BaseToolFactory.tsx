import { ReactElement } from "react";
import { createHTMLElement } from "../../../utils";
import { ToolbarItem } from "../uikit";
import { ToolProps } from "./tool";

export interface BaseToolFactoryProps extends ToolProps {
  label: ReactElement;
  elementTag: string;
}

export const BaseToolFactory: React.FC<BaseToolFactoryProps> = (props) => {
  const { label, elementTag, selection } = props;
  const onClick = () => {
    const content = selection?.getContent();

    if (content) {
      selection?.deleteContents();
      const newNode = createHTMLElement({ type: elementTag });
      newNode.appendChild(content);
      selection?.insertNode(newNode);
    }
  };
  return <ToolbarItem onClick={onClick}>{label}</ToolbarItem>;
};

BaseToolFactory.displayName = "BaseToolFactory";
