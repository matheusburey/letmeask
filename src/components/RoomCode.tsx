import { Text } from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";

import Button from "./Button";

interface IRoomCodeProps {
  code: string;
}
function RoomCode({ code }: IRoomCodeProps) {
  const copyRoomCode = () => {
    const type = "text/plain";
    const blob = new Blob([code], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data);
  };

  return (
    <Button
      pr="1px"
      w="auto"
      transition="filter 0.2s"
      _hover={{ filter: "brightness(0.9)" }}
      size="md"
      onClick={copyRoomCode}
      leftIcon={<FiCopy />}
    >
      <Text h="38px" p="10px 6px" bg="white" color="black" rounded="6">
        Sala #{code}
      </Text>
    </Button>
  );
}

export default RoomCode;
