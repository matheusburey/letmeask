import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IQuestionProps {
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  children: ReactNode;
  isAnswered?: string;
  isHighlighted?: string;
}

function Question({
  author,
  content,
  children,
  isAnswered,
  isHighlighted,
}: IQuestionProps) {
  return (
    <Box
      // eslint-disable-next-line no-nested-ternary
      bg={isAnswered ? "#DBDCDD" : isHighlighted ? "#F4F0FF" : "white"}
      border={isHighlighted && !isAnswered ? "1px solid #835AFD" : ""}
      shadow="md"
      rounded="md"
      p="6"
    >
      <Text>{content}</Text>
      <Flex justify="space-between" align="center" mt="6">
        <Flex align="center">
          <Avatar name={author.name} src={author.avatar} size="sm" mr="2" />
          <Text color="gray.600" fontSize="md">
            {author.name}
          </Text>
        </Flex>
        <Flex justify="center">{children}</Flex>
      </Flex>
    </Box>
  );
}

Question.defaultProps = {
  isAnswered: false,
  isHighlighted: false,
};

export default Question;
