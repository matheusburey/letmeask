import { onValue, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg";
import deleteImg from "../assets/images/delete.svg";
import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";
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

function AdminRoom() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

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
  const handleEndRoom = (questionId = "") => {
    if (
      window.confirm("voce realmente deseja encerar esta sala") &&
      questionId
    ) {
      remove(ref(database, `rooms/${id}`));
      navigate("/");
    }
  };

  const handleDeleteQuestion = (questionId = "") => {
    if (
      window.confirm("voce realmente deseja excluir essa pergunta") &&
      questionId
    ) {
      remove(ref(database, `rooms/${id}/questions/${questionId}`));
    }
  };

  const handleHighlightQuestion = (questionId = "") => {
    if (questionId) {
      update(ref(database, `rooms/${id}/questions/${questionId}`), {
        isHighlighted: true,
      });
    }
  };

  const handleCheckQuestionAnswer = (questionId = "") => {
    if (questionId) {
      update(ref(database, `rooms/${id}/questions/${questionId}`), {
        isAnswered: true,
      });
    }
  };

  return (
    <div id="page_room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={id} />
            <Button callback={handleEndRoom} isOutlined typeButton>
              Encerar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room_title">
          <h1>Sala {title}</h1>
          <span>{questions.length} perguntas</span>
        </div>
        {questions.map(({ id, isHighlighted, isAnswered, author, content }) => {
          return (
            <Question
              key={id}
              author={author}
              isHighlighted={isHighlighted}
              isAnswered={isAnswered}
              content={content}
            >
              <button
                type="button"
                aria-label="Marcar pergunta pergunta como respondida"
                onClick={() => handleCheckQuestionAnswer(id)}
              >
                <img src={checkImg} alt="Remover pergunta" />
              </button>
              <button
                type="button"
                aria-label="Dar pergunta destaque a pergunta"
                onClick={() => handleHighlightQuestion(id)}
              >
                <img src={answerImg} alt="Remover pergunta" />
              </button>
              <button
                type="button"
                aria-label="Remover pergunta"
                onClick={() => handleDeleteQuestion(id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          );
        })}
      </main>
    </div>
  );
}

export default AdminRoom;
