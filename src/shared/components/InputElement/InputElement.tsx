import { InputHTMLAttributes } from "react";
import "./InputElement.styles.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const InputElement = ({ className, ...rest }: Props) => {
  return (
    <input
      className={className ? `input-element ${className}` : "input-element"}
      {...rest}
    ></input>
  );
};
