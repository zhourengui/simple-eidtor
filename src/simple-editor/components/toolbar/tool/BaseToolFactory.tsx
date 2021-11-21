import { ReactElement } from "react";
import { createHTMLElement } from "../../../utils";
import { ToolbarItem } from "../uikit";
import { ToolProps } from "./tool";

export interface BaseToolFactoryProps extends ToolProps {
  label: ReactElement;
  elementTag: string;
}

export const BaseToolFactory: React.FC<BaseToolFactoryProps> = (props) => {
  const { label, elementTag, selection, editorContent } = props;
  const onClick = () => {
    const processingElement: ParentNode | null =
      selection?.getCommonAncestorContainer() as ParentNode;
    const content = selection?.getContent()?.firstChild;

    if (processingElement === editorContent?.getEditorBody()) return;

    if (content) {
      selection?.deleteContents();
      selection?.insertNode(
        createHTMLElement({ type: elementTag, children: [content] })
      );
    }
  };
  return <ToolbarItem onClick={onClick}>{label}</ToolbarItem>;
};

BaseToolFactory.displayName = "BaseToolFactory";
