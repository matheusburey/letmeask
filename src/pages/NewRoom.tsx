import { Image, Flex, Stack, Text, Input } from "@chakra-ui/react";
import { onValue, push, ref, set } from "firebase/database";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import { AuthUse } from "../providers/Auth";
import { database } from "../services/firebase";

function NewRoom() {
  const { user } = AuthUse();
  const [nameRoom, setnameRoom] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();
    if (!nameRoom.trim()) {
      return;
    }
    await set(push(ref(database, "rooms")), {
      title: nameRoom,
      authorId: user?.id,
    });
    onValue(ref(database, "rooms"), (data) => {
      const room = Object.keys(data.val());
      const roomId = room[room.length - 1];
      navigate(`/admin/rooms/${roomId}`);
    });
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
          <Text
            fontFamily="poppins"
            fontWeight="bold"
            as="h2"
            align="center"
            fontSize="2xl"
          >
            Criar uma nova sala
          </Text>
          <form onSubmit={handleCreateRoom}>
            <Input
              bg="white"
              my="4"
              size="lg"
              mb="4"
              value={nameRoom}
              onChange={(event) => setnameRoom(event.target.value)}
              type="text"
              placeholder="Nome da sala"
            />
            <Button>Criar sala</Button>
          </form>
          <Text fontSize="sm" align="center" pt="2" color="gray">
            Quer entrar em uma sala existente?
            <Link to="/">
              <Button
                w="auto"
                ml="1"
                fontSize="sm"
                color="pink.400"
                variant="link"
              >
                clique aqui
              </Button>
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default NewRoom;
