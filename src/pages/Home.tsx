import { Image, Flex, Stack, Text, Input, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import logoImg from "../assets/images/logo.svg";
import Aside from "../components/Aside";
import Button from "../components/Button";
import { AuthUse } from "../providers/Auth";
import { RoomUse } from "../providers/Room";

function Home() {
  const { signInWithGoogle } = AuthUse();
  const { joinRoom } = RoomUse();
  const [roomCode, setRoomCode] = useState("");
  const [spinner, setSpinner] = useState<any>(undefined);

  const clickButtonJoinRoom = () => {
    setSpinner(true);
    joinRoom(roomCode);
  };
  return (
    <Flex h="100vh">
      <Aside />
      <Stack as="main" flex="8" px="32px" align="center" justify="center">
        <Stack maxW="320px">
          <Image mb="16" alignSelf="center" src={logoImg} alt="Letmeask" />
          <Button
            type="button"
            colorScheme="gray"
            borderColor="black"
            variant="outline"
            onClick={signInWithGoogle}
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
            size="lg"
            mb="4"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value)}
            type="text"
            placeholder="Digite o código da sala"
          />
          <Button
            spinner={spinner}
            disabled={!roomCode}
            type="button"
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
