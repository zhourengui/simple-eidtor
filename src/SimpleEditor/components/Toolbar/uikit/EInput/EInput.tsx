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
  const { defaultValue, placeholder, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getValue: () => inputRef?.current?.value,
  }));

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <input
      ref={inputRef}
      className="e-input"
      defaultValue={defaultValue}
      placeholder={placeholder}
      onInput={onInput}
    />
  );
});

export default EInput;
