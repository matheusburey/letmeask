import { ReactNode } from "react";

import "../style/button.scss";

interface IButtonProps {
  children: ReactNode;
  type: "submit" | "button";
}

function Button({ children, type }: IButtonProps) {
  return <button className="button" type={type}>{children}</button>;
}

export default Button;
