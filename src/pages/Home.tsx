import { Image, Flex, Stack, Text, Input, Divider } from "@chakra-ui/react";
import { get, child, ref } from "firebase/database";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import googleIconImg from "../assets/images/google-icon.svg";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import { AuthUse } from "../providers/Auth";
import { database } from "../services/firebase";

function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = AuthUse();
  const [roomCode, setRoomCode] = useState("");

  const handleCreateRoom = () => {
    if (!user) {
      signInWithGoogle();
    }
    navigate("/rooms/new");
  };

  const joinRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (!roomCode.trim()) {
      return;
    }
    const room = await get(child(ref(database), `rooms/${roomCode}`));
    if (!room.val()) {
      console.log("sala nao existe");
      return;
    }
    navigate(`rooms/${roomCode}`);
  };

  return (
    <Flex h="100vh">
      <Stack
        as="aside"
        flex="7"
        px="80px"
        justify="center"
        bg="purple.500"
        color="white"
      >
        <Image
          maxW="320px"
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <Text fontFamily="poppins" fontWeight="bold" fontSize="4xl">
          Crie salas de Q&amp;A ao-vivo
        </Text>
        <Text fontSize="2xl">
          Tire as dúvidas da sua audiência em tempo-real
        </Text>
      </Stack>
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
          <form onSubmit={joinRoom}>
            <Input
              size="lg"
              mb="4"
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value)}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button>Entrar na sala</Button>
          </form>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default Home;
