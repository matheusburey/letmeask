import { onValue, push, ref, set } from "firebase/database";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import RoomCode from "../components/RoomCode";
import { AuthUse } from "../providers/Auth";
import { database } from "../services/firebase";

import "../style/room.scss";

interface IFirebaseQuestions {
  [key: string]: IQuestions;
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
}

function Room() {
  const { id } = useParams();
  const [newQuestion, setNewQuestion] = useState("");
  const { user } = AuthUse();
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [title, setTitle] = useState("");

  if (!id) {
    throw new Error("id");
  }

  useEffect(() => {
    onValue(ref(database, `rooms/${id}`), (room) => {
      const roomValue = room.val();
      const questionsMap = Object.entries(
        roomValue.questions as IFirebaseQuestions
      ).map(([key, values]) => {
        return {
          id: key,
          content: values.content,
          author: values.author,
          isHighlighted: values.isHighlighted,
          isAnswered: values.isAnswered,
        };
      });
      setTitle(roomValue.title);
      setQuestions(questionsMap);
    });
  }, []);

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
    <div id="page_room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={id} />
        </div>
      </header>
      <main>
        <div className="room_title">
          <h1>Sala {title}</h1>
          <span>{questions.length} perguntas</span>
        </div>

        <form onSubmit={handleSubmitNewQuestion}>
          <textarea
            placeholder="Qual sua pergunta?"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
          />
          <div>
            {user ? (
              <div>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta{" "}
                <button type="button">faça seu login</button>
              </span>
            )}
            <Button>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Room;
