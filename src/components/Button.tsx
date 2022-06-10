import { ReactNode } from "react";

import "../style/button.scss";

interface IButtonProps {
  children: ReactNode;
}

function Button({ children }: IButtonProps) {
  return (
    <button className="button" type="submit">
      {children}
    </button>
  );
}

export default Button;
