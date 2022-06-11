import { ReactNode } from "react";

import "../style/button.scss";

interface IButtonProps {
  children: ReactNode;
  typeButton?: boolean;
  isOutlined?: boolean;
}

function Button({ children, typeButton, isOutlined }: IButtonProps) {
  return (
    <button
      className={`button ${isOutlined ? "outlined" : " "}`}
      type={typeButton ? "button" : "submit"}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  typeButton: false,
  isOutlined: false,
};

export default Button;
