import { Box, Stack, HStack, Image } from "@chakra-ui/react";

import logoImg from "../assets/images/logo.svg";
import Button from "./Button";
import RoomCode from "./RoomCode";

interface IHeaderProps {
  id: string;
  fun?: () => void;
}

function Header({ id, fun }: IHeaderProps) {
  return (
    <Box as="header" p="6" borderBottom="#e2e8f0 solid 1px">
      <Stack
        maxW="1120px"
        direction={["column", "row", "row"]}
        mx="auto"
        align="center"
        justify="space-between"
        spacing="4"
      >
        <Image maxH="45px" src={logoImg} alt="Letmeask" />
        <HStack spacing="4">
          <RoomCode code={id} />
          {fun && (
            <Button variant="outline" w="auto" h="40px" onClick={fun}>
              Encerar sala
            </Button>
          )}
        </HStack>
      </Stack>
    </Box>
  );
}

Header.defaultProps = {
  fun: undefined,
};

export default Header;
