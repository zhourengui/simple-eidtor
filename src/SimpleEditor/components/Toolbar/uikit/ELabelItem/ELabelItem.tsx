import React, { ReactElement } from "react";
import "./style.scss";

export interface FormItemProps {
  label: string;
  children: ReactElement;
}

const ELabelItem: React.FC<FormItemProps> = (props) => {
  const { label, children } = props;

  return (
    <div>
      <span className="e-label">{label}</span>
      {children}
    </div>
  );
};

export default ELabelItem;
