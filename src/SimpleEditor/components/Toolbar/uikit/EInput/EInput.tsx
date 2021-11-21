import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";
import "./style.scss";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  ref?: any;
  onChange?(value: any): void;
}

const EInput: React.FC<InputProps> = forwardRef((props, ref) => {
  const { defaultValue, placeholder, onChange, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getValue: () => inputRef?.current?.value,
  }));

  return (
    <input
      ref={inputRef}
      className="e-input"
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        onChange?.(event.target.value)
      }
      {...rest}
    />
  );
});

export default EInput;
