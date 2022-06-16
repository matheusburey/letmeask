import { onValue, ref } from "firebase/database";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import { database } from "../../services/firebase";

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
  const [questions, setQuestions] = useState<IQuestions[]>();
  const [title, setTitle] = useState("");

  const getRoom = (roomId: string, userId = "") => {
    onValue(ref(database, `rooms/${roomId}`), (room) => {
      const roomValue = room.val();
      let questionsArray: IQuestions[] = [];
      if (roomValue.questions) {
        questionsArray = Object.entries(
          roomValue.questions as IFirebaseQuestions
        ).map(([key, values]) => {
          return {
            id: key,
            content: values.content,
            author: values.author,
            isHighlighted: values.isHighlighted,
            isAnswered: values.isAnswered,
            likeCount: Object.values(values.likes ?? {}).length,
            likeId: Object.entries(values.likes ?? {}).find(
              ([_, like]) => like.authorId === userId
            )?.[0],
          };
        });
      }
      setTitle(roomValue.title);
      setQuestions(questionsArray);
    });
  };

  const value = useMemo(
    () => ({ title, questions, getRoom }),
    [title, questions]
  );

  return (
    <RoomContext.Provider value={value}> {children} </RoomContext.Provider>
  );
}
