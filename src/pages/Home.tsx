import { Image, Flex, Stack, Text, Input, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import googleIconImg from "../assets/images/google-icon.svg";
import logoImg from "../assets/images/logo.svg";
import Aside from "../components/Aside";
import Button from "../components/Button";
import { AuthUse } from "../providers/Auth";
import { RoomUse } from "../providers/Room";

function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = AuthUse();
  const { joinRoom } = RoomUse();
  const [roomCode, setRoomCode] = useState("");

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    navigate("/rooms/new");
  };

  return (
    <Flex h="100vh">
      <Aside />
      <Stack as="main" flex="8" px="32px" align="center" justify="center">
        <Stack maxW="320px">
          <Image mb="16" alignSelf="center" src={logoImg} alt="Letmeask" />
          <Button type="button" colorScheme="red" onClick={handleCreateRoom}>
            <Image mr="2" src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </Button>
          <Flex py="7" color="gray.500" align="center" justify="space-between">
            <Divider colorScheme="gray" w="24%" />
            <Text fontSize="sm">ou entre em uma sala</Text>
            <Divider colorScheme="gray" w="24%" />
          </Flex>
          <Input
            bg="white"
            size="lg"
            mb="4"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value)}
            type="text"
            placeholder="Digite o código da sala"
          />
          <Button
            disabled={!roomCode}
            type="button"
            onClick={() => joinRoom(roomCode)}
          >
            Entrar na sala
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default Home;
