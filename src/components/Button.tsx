/* eslint-disable react/default-props-match-prop-types */
import { Button as ButtonChakra, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IButtonProps extends ButtonProps {
  children: ReactNode;
}

function Button({ children, ...rest }: IButtonProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonChakra {...rest}>{children}</ButtonChakra>
  );
}

Button.defaultProps = {
  colorScheme: "purple",
  w: "100%",
  fontWeight: "normal",
  size: "lg",
  type: "submit",
};

export default Button;
