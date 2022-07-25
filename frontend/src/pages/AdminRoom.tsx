import { Badge, Box, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Question from "../components/Question";
import { RoomUse } from "../providers/Room";

export function AdminRoom() {
  const { id } = useParams();
  const { title, questions, getRoom } = RoomUse();
  const [conn, setConn] = useState<WebSocket>();

  if (!id) {
    throw new Error("id");
  }

  useEffect(() => {
    return () => {
      const ws = new WebSocket(`${import.meta.env.VITE_API_WS}/${id}`);
      setConn(ws);
      return getRoom(ws);
    };
  }, [id]);

  const handleDeleteQuestion = (questionId = "") => {
    if (
      window.confirm("voce realmente deseja excluir essa pergunta") &&
      questionId
    ) {
      console.log(`rooms/${id}/questions/${questionId}`);
    }
  };

  const handleHighlightQuestion = (questionId = "") => {
    if (questionId) {
      console.log(`rooms/${id}/questions/${questionId}`, {
        isHighlighted: true,
      });
    }
  };

  const handleCheckQuestionAnswer = (questionId = "") => {
    if (questionId) {
      console.log(`rooms/${id}/questions/${questionId}`, {
        isAnswered: true,
      });
    }
  };

  return (
    <>
      <Header id={id} admin />
      <Box as="main" maxW="800px" mx="auto" p="4">
        <Flex mt="8" mb="6">
          <Text as="h1" fontWeight="bold" fontSize="2xl" fontFamily="poppins">
            Sala {title}
          </Text>
          <Badge
            h="9"
            ml="4"
            py="2"
            px="3"
            colorScheme="purple"
            borderRadius="full"
          >
            {questions?.length} perguntas
          </Badge>
        </Flex>
        <Stack>
          {questions?.map(({ id, isHighlighted, isAnswered, description }) => {
            return (
              <Question
                key={id}
                author={{ name: "Anonimo", avatar: "", id: `${id}1` }}
                isHighlighted={isHighlighted}
                isAnswered={isAnswered}
                content={description}
              >
                <IconButton
                  color="gray"
                  variant="glost"
                  aria-label="Marcar pergunta pergunta como respondida"
                  fontSize="24px"
                  onClick={() => handleCheckQuestionAnswer(id)}
                  icon={<AiOutlineCheckCircle />}
                />
                <IconButton
                  color="gray"
                  variant="glost"
                  fontSize="24px"
                  aria-label="Dar pergunta destaque a pergunta"
                  onClick={() => handleHighlightQuestion(id)}
                  icon={<RiQuestionAnswerLine />}
                />
                <IconButton
                  color="gray"
                  variant="glost"
                  aria-label="Remover pergunta"
                  fontSize="24px"
                  onClick={() => handleDeleteQuestion(id)}
                  icon={<AiOutlineDelete />}
                />
              </Question>
            );
          })}
        </Stack>
      </Box>
    </>
  );
}
