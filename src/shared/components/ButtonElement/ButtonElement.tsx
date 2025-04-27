import { ButtonHTMLAttributes } from "react";
import "./ButtonElement.styles.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const ButtonElement = ({ className, ...rest }: Props) => {
  return (
    <button
      className={className ? `button-element ${className}` : "button-element"}
      {...rest}
    ></button>
  );
};
