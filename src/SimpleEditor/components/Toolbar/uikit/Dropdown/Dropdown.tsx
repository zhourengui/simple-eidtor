import { ReactElement } from "react";
import { EditorSelection } from "../../../../selection";
import ToolbarItem from "../ToolbarItem/ToolbarItem";
import Transition from "../Transition/Transition";
import "./style.scss";

export interface DropdownProps {
  isOpen: boolean;
  duration?: number;
  selection?: EditorSelection;
  onToolbarClick?(): void;
  setIsOpen(value: boolean): void;
  labelFactory: (selection?: EditorSelection) => ReactElement;
  viewFactory: (selection?: EditorSelection) => ReactElement;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    selection,
    duration = 300,
    isOpen,
    onToolbarClick,
    setIsOpen,
    labelFactory,
    viewFactory,
  } = props;

  const onMaskClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ToolbarItem onClick={onToolbarClick}>
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
