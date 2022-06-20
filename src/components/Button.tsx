import { Button as ButtonChakra, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IButtonProps extends ButtonProps {
  children: ReactNode;
  fun?: () => void;
}

function Button({
  children,
  fun,
  ...rest
}: IButtonProps) {
  return (
    <ButtonChakra {...rest} onClick={fun}>
      {children}
    </ButtonChakra>
  );
}

Button.defaultProps = {
  typeButton: false,
  isOutlined: false,
  fun: undefined,
  colorScheme: "purple",
  w: "100%",
  fontWeight: "normal",
  size: "lg",
};

export default Button;
