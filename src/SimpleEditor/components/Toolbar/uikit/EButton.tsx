import { ReactElement } from "react";

export interface BaseEButtonProps {
  children: string | ReactElement;
}

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLElement>,
  "type" | "disabled"
> &
  BaseEButtonProps;

type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> &
  BaseEButtonProps;

export type EButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const EButton: React.FC<EButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <div className="e-button" {...rest}>
      {children}
    </div>
  );
};

export default EButton;
