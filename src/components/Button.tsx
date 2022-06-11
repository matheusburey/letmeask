import { ReactNode } from "react";

import "../style/button.scss";

interface IButtonProps {
  children: ReactNode;
  typeButton?: boolean;
  isOutlined?: boolean;
  callback?: () => void;
}

function Button({ children, typeButton, isOutlined, callback }: IButtonProps) {
  return (
    <button
      className={`button ${isOutlined ? "outlined" : " "}`}
      type={typeButton ? "button" : "submit"}
      onClick={callback}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  typeButton: false,
  isOutlined: false,
  callback: undefined,
};

export default Button;
