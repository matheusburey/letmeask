import { Button as ButtonChakra, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

// import "../style/button.scss";

interface IButtonProps extends ButtonProps {
  children: ReactNode;
  typeButton?: boolean;
  isOutlined?: boolean;
  fun?: () => void;
  color?: string;
}

function Button({
  children,
  typeButton,
  isOutlined,
  fun,
  color,
}: IButtonProps) {
  return (
    <ButtonChakra
      colorScheme={color}
      variant={isOutlined ? "outline" : "solid"}
      type={typeButton ? "button" : "submit"}
      size="lg"
      w="100%"
      fontWeight="normal"
      onClick={fun}
    >
      {children}
    </ButtonChakra>
  );
}

Button.defaultProps = {
  typeButton: false,
  isOutlined: false,
  fun: undefined,
  color: "purple",
};

export default Button;
