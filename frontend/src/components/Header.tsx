import { Box, Stack, Image, Button } from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";

import logoImg from "../assets/images/logo.svg";
import { RoomUse } from "../providers/Room";

interface IHeaderProps {
  id: string;
  admin?: boolean;
}

function Header({ id, admin }: IHeaderProps) {
  const { deleteRoom } = RoomUse();

  const handleEndRoom = () => {
    if (window.confirm("voce realmente deseja encerar esta sala")) {
      deleteRoom(id)
    }
  };

  const copyRoomCode = () => {
    const type = "text/plain";
    const blob = new Blob([id], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data);
  };

  return (
    <Box as="header" p="6" borderBottom="#e2e8f0 solid 1px">
      <Stack
        maxW="1120px"
        direction={["column", "row", "row"]}
        mx="auto"
        justify="space-between"
        align="center"
        spacing="4"
      >
        <Image maxH="45px" src={logoImg} alt="Letmeask" />
        <Stack direction={["column", "row", "row"]} spacing="4">
          <Button
            size="md"
            justifyContent="left"
            onClick={copyRoomCode}
            leftIcon={<FiCopy />}
          >
            Sala #{id}
          </Button>
          {admin && (
            <Button variant="outline" size="md" onClick={handleEndRoom}>
              Encerar sala
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
Header.defaultProps = {
  admin: false,
};

export default Header;
