import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

interface IFirebaseQuestions {
  [key: string]: IQuestions & {
    likes: {
      [key: string]: {
        authorId: string;
      };
    };
  };
}

interface IAuthContext {
  title: string;
  questions: IQuestions[] | undefined;
  getRoom: (roomId: string, userId?: string) => void;
  checkRoom: (roomId: string) => void;
  createNewRoom: (title: string) => void;
  deleteRoom: (rooms: string) => void;
}

interface IQuestions {
  id?: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  isHighlighted: string;
  isAnswered: string;
  likeCount?: number;
  likeId?: string | undefined;
}

interface IChildrenProps {
  children: ReactNode;
}

const RoomContext = createContext({} as IAuthContext);

export const RoomUse = () => useContext(RoomContext);

export function RoomProvider({ children }: IChildrenProps) {
  const toast = useToast();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<IQuestions[]>();
  const [title, setTitle] = useState("");

  const serialize = (
    questionsData: IFirebaseQuestions,
    userId = ""
  ): IQuestions[] => {
    return Object.entries(questionsData as IFirebaseQuestions).map(
      ([key, values]) => {
        return {
          id: key,
          content: values.content,
          author: values.author,
          isHighlighted: values.isHighlighted,
          isAnswered: values.isAnswered,
          likeCount: Object.values(values.likes ?? {}).length,
          likeId: Object.entries(values.likes ?? {}).find(
            ([, like]) => like.authorId === userId
          )?.[0],
        };
      }
    );
  };

  const getRoom = (roomId: string, userId = "") => {
    // onValue(ref(database, `rooms/${roomId}`), (room) => {
    //   const { questions, title } = room.val();
    //   let questionsArray: IQuestions[] = [];
    //
    //   if (questions) {
    //     questionsArray = serialize(questions as IFirebaseQuestions, userId);
    //   }
    //   setTitle(title);
    //   setQuestions(questionsArray);
    //   return () => off(ref(database));
    // });
  };

  const checkRoom = async (roomId: string) => {
    try {
      const { data } = await api.get(`rooms/${roomId}`);
      setTitle(data.data.title);
      navigate(`rooms/${roomId}`);
    } catch (e) {
      toast({
        title: "sala nao existe.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const createNewRoom = async (title: string) => {
    try {
      const { data } = await api.post("rooms", { title });
      const roomId = data.data.id;
      navigate(`rooms/${roomId}`);
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro ao criar sala",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteRoom = (roomId: string) => {
    try {
      api.delete(`rooms/${roomId}`);
      navigate("/");
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro ao criar sala",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <RoomContext.Provider value={{ title, questions, getRoom, checkRoom, createNewRoom, deleteRoom }}>
      {children}
    </RoomContext.Provider>
  );
}
