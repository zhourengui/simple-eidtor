import { ReactElement } from "react";
import { Transition } from ".";
import { EditorSelection } from "../../../selection";
import ToolbarItem from "./ToolbarItem";

export interface DropdownProps {
  isOpen: boolean;
  duration?: number;
  selection?: EditorSelection;
  setIsOpen(value: boolean): void;
  labelFactory: (selection?: EditorSelection) => ReactElement;
  viewFactory: (selection?: EditorSelection) => ReactElement;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    selection,
    duration = 300,
    isOpen,
    setIsOpen,
    labelFactory,
    viewFactory,
  } = props;

  const onMaskClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ToolbarItem>
        <div className="dropdown">
          <div className="dropdown-label">{labelFactory(selection)}</div>
          <Transition animation="zoom-in-top" timeout={duration} in={isOpen}>
            <div className="dropdown-view">{viewFactory(selection)}</div>
          </Transition>
        </div>
      </ToolbarItem>
      {isOpen ? (
        <div className="dropdown-mask" onClick={onMaskClick}></div>
      ) : null}
    </>
  );
};

export default Dropdown;
