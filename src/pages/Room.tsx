import {
  Avatar,
  Badge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { push, ref, remove, set } from "firebase/database";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";
import { AuthUse } from "../providers/Auth";
import { RoomUse } from "../providers/Room";
import { database } from "../services/firebase";

function Room() {
  const { id } = useParams();
  const { user } = AuthUse();
  const { questions, title, getRoom } = RoomUse();
  const [newQuestion, setNewQuestion] = useState("");

  if (!id) {
    throw new Error("id");
  }

  useEffect(() => {
    getRoom(id, user?.id);
  }, [id]);

  const handleLike = async (questionId = "", likeId = "") => {
    if (!likeId) {
      await set(
        push(ref(database, `rooms/${id}/questions/${questionId}/likes`)),
        {
          authorId: user?.id,
        }
      );
    } else {
      remove(
        ref(database, `rooms/${id}/questions/${questionId}/likes/${likeId}`)
      );
    }
  };

  const handleSubmitNewQuestion = async (event: FormEvent) => {
    event.preventDefault();
    if (!newQuestion.trim()) {
      return;
    }
    if (!user) {
      throw new Error("You must be logged in ");
    }

    const question = {
      content: newQuestion,
      author: user,
      isHighlighted: false,
      isAnswered: false,
    };

    await set(push(ref(database, `rooms/${id}/questions`)), question);
    setNewQuestion("");
  };

  return (
    <>
      <Box as="header" p="6" borderBottom="#e2e8f0 solid 1px">
        <Flex maxW="1120px" mx="auto" align="center" justify="space-between">
          <Image maxH="45px" src={logoImg} alt="Letmeask" />
          <RoomCode code={id} />
        </Flex>
      </Box>
      <Box as="main" maxW="800px" mx="auto" pb="4">
        <Flex mt="8" mb="6">
          <Text as="h1" fontWeight="bold" fontSize="2xl" fontFamily="poppins">
            Sala {title}
          </Text>
          <Badge ml="4" py="2" px="3" colorScheme="purple" borderRadius="full">
            {questions?.length} perguntas
          </Badge>
        </Flex>

        <Box as="form" onSubmit={handleSubmitNewQuestion} mb="8">
          <Textarea
            variant="filled"
            boxShadow="md"
            resize="vertical"
            bg="white"
            mb="8"
            minH="130px"
            placeholder="Qual sua pergunta?"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
          />
          <Flex align="center" justify="space-between">
            {user ? (
              <Flex align="center">
                <Avatar name={user.name} src={user.avatar} size="sm" mr="2" />
                <span>{user.name}</span>
              </Flex>
            ) : (
              <Text fontSize="sm" align="center" pt="2" color="gray">
                Para enviar uma pergunta
                <Button
                  w="auto"
                  ml="1"
                  fontSize="sm"
                  color="pink.400"
                  variant="link"
                >
                  faça seu login
                </Button>
              </Text>
            )}
            <Button w="auto">Enviar pergunta</Button>
          </Flex>
        </Box>
        <Stack>
          {questions?.map(
            ({
              id,
              author,
              isHighlighted,
              isAnswered,
              content,
              likeCount,
              likeId,
            }) => {
              return (
                <Question
                  key={id}
                  isAnswered={isAnswered}
                  isHighlighted={isHighlighted}
                  author={author}
                  content={content}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    aria-label="Marcar como gostei"
                    onClick={() => handleLike(id, likeId)}
                    rightIcon={<AiOutlineLike />}
                    fontSize="24px"
                    p="4"
                    _hover={{ color: "#B794F4" }}
                  >
                    {!!likeCount && (
                      <Text fontSize="lg" pt="2">
                        {likeCount}
                      </Text>
                    )}
                  </Button>
                </Question>
              );
            }
          )}
        </Stack>
      </Box>
    </>
  );
}

export default Room;
