import { Stack, Image, Text } from "@chakra-ui/react";

import illustrationImg from "../assets/images/illustration.svg";

function Aside() {
  return (
    <Stack
      display={["none", "flex", "flex"]}
      as="aside"
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
      <Text fontSize="2xl">Tire as dúvidas da sua audiência em tempo-real</Text>
    </Stack>
  );
}

export default Aside;
