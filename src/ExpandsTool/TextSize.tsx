import { useState } from "react";
import { ToolProps } from "../SimpleEditor/components/Toolbar/tool/tool";
import { Dropdown } from "../SimpleEditor/components/Toolbar/uikit";

export const TextSize: React.FC<ToolProps> = (props) => {
  const { selection } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      selection={selection}
      labelFactory={() => <span onClick={() => setIsOpen(true)}>TextSize</span>}
      viewFactory={() => <span>TextSize</span>}
    />
  );
};

TextSize.displayName = "TextSize";
