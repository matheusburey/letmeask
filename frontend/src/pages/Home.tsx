import {
  Image,
  Flex,
  Stack,
  Text,
  Input,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import Aside from "../components/Aside";
import { AuthUse } from "../providers/Auth";
import { RoomUse } from "../providers/Room";

function Home() {
  const { user, signInWithGoogle } = AuthUse();
  const { checkRoom } = RoomUse();
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clickButtonJoinRoom = async () => {
    try {
      setIsLoading(true);
      await checkRoom(roomCode);
      navigate(`rooms/${roomCode}`);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const newRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    navigate("rooms/new");
  };

  return (
    <Flex h="100vh">
      <Aside />
      <Stack as="main" flex="8" px="32px" align="center" justify="center">
        <Stack maxW="320px">
          <Image mb="16" alignSelf="center" src={logoImg} alt="Letmeask" />
          <Button
            colorScheme="gray"
            borderColor="black"
            variant="outline"
            onClick={newRoom}
            leftIcon={<FcGoogle />}
          >
            Crie sua sala com o Google
          </Button>
          <Flex py="7" color="gray.500" align="center" justify="space-between">
            <Divider colorScheme="gray" w="24%" />
            <Text fontSize="sm">ou entre em uma sala</Text>
            <Divider colorScheme="gray" w="24%" />
          </Flex>
          <Input
            bg="white"
            type="text"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value)}
            placeholder="Digite o código da sala"
          />
          <Button
            isLoading={isLoading}
            disabled={!roomCode}
            onClick={clickButtonJoinRoom}
          >
            Entrar na sala
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default Home;
