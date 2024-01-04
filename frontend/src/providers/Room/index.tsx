import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

// interface IFirebaseQuestions {
//   [key: string]: IQuestions & {
//     likes: {
//       [key: string]: {
//         authorId: string;
//       };
//     };
//   };
// }

interface IAuthContext {
  title: string;
  questions: IQuestions[] | undefined;
  getRoom: (ws: string) => void;
  checkRoom: (roomId: string) => void;
  createNewRoom: (title: string) => void;
  deleteRoom: (rooms: string) => void;
  sendQuestion: (ws: WebSocket, question: string) => void;
}

interface IQuestions {
  id?: string;
  description: string;
  room_id: string;
  /* author: {
    id: string;
    name: string;
    avatar: string;
  }; */
  isHighlighted: string;
  isAnswered: string;
  likeCount?: number;
  likeId?: string;
}

interface IChildrenProps {
  children: ReactNode;
}

const RoomContext = createContext({} as IAuthContext);

export const RoomUse = () => useContext(RoomContext);

export function RoomProvider({ children }: IChildrenProps) {
  const toast = useToast();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [title, setTitle] = useState("");

  const getRoom = async (id: string) => {
    const data = [
      {
        id,
        title: "Teste",
        room_id: "157",
        description: "teste",
        isHighlighted: "false",
        isAnswered: "false",
        likeCount: 0,
        likeId: "157",
      },
    ];
    setQuestions(data);
  };

  const sendQuestion = async (ws: WebSocket, question: string) => {
    ws.send(question);
  };

  const checkRoom = async (roomId: string) => {
    try {
      const { data } = { data: { data: { title: "Teste" } } }; // await api.get(`rooms/${roomId}`);
      const roomTitle = data.data.title;
      localStorage.setItem("roomTitle", roomTitle);
      setTitle(roomTitle);
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
      const { data } = { data: { data: { id: "157", title } } }; // await api.post("rooms", { title });
      const roomId = data.data.id;
      navigate(`/admin/rooms/${roomId}`);
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
  };

  const value = useMemo(
    () => ({
      title,
      questions,
      getRoom,
      checkRoom,
      createNewRoom,
      deleteRoom,
      sendQuestion,
    }),
    [title, questions],
  );

  return (
    <RoomContext.Provider value={value}> {children} </RoomContext.Provider>
  );
}
