import { Image, Flex, Stack, Text, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import Aside from "../components/Aside";
import { AuthUse } from "../providers/Auth";
import { RoomUse } from "../providers/Room";

function NewRoom() {
  const { user } = AuthUse();
  const { newRoom } = RoomUse();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nameRoom, setnameRoom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const handleCreateRoom = async () => {
    setIsLoading(true);
    const newRoomName = nameRoom.trim();
    if (newRoomName && user) {
      const roomId = await newRoom(newRoomName, user.id);
      navigate(`/admin/rooms/${roomId}`);
    }
    setIsLoading(false);
  };

  return (
    <Flex h="100vh">
      <Aside />
      <Stack as="main" flex="8" px="32px" align="center" justify="center">
        <Stack maxW="320px">
          <Image mb="16" alignSelf="center" src={logoImg} alt="Letmeask" />
          <Text
            fontFamily="poppins"
            fontWeight="bold"
            as="h2"
            align="center"
            fontSize="2xl"
          >
            Criar uma nova sala
          </Text>
          <Input
            bg="white"
            value={nameRoom}
            onChange={(event) => setnameRoom(event.target.value)}
            type="text"
            placeholder="Nome da sala"
          />
          <Button onClick={handleCreateRoom} isLoading={isLoading}>
            Criar sala
          </Button>

          <Text fontSize="sm" align="center" pt="2" color="gray">
            Quer entrar em uma sala existente?
            <Button
              w="auto"
              ml="1"
              fontSize="sm"
              color="pink.400"
              variant="link"
              onClick={() => navigate("/")}
            >
              clique aqui
            </Button>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default NewRoom;
