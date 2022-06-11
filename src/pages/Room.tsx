import { off, onValue, push, ref, remove, set } from "firebase/database";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";
import { AuthUse } from "../providers/Auth";
import { database } from "../services/firebase";

import "../style/room.scss";

interface IFirebaseQuestions {
  [key: string]: IQuestions & {
    likes: {
      [key: string]: {
        authorId: string;
      };
    };
  };
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

function Room() {
  const { id } = useParams();
  const [newQuestion, setNewQuestion] = useState("");
  const { user } = AuthUse();
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [title, setTitle] = useState("");

  if (!id) {
    throw new Error("id");
  }

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

  useEffect(() => {
    onValue(ref(database, `rooms/${id}`), (room) => {
      const roomValue = room.val();
      if (roomValue.questionsMap) {
        const questionsMap = Object.entries(
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
              ([, like]) => like.authorId === user?.id
            )?.[0],
          };
        });
        setTitle(roomValue.title);
        setQuestions(questionsMap);
      }
    });

    return () => {
      off(ref(database));
    };
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
        {questions.map(
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
                <button
                  className={`like_button ${likeId ? "liked" : ""}`}
                  type="button"
                  aria-label="Marcar como gostei"
                  onClick={() => handleLike(id, likeId)}
                >
                  {!!likeCount && <span>{likeCount}</span>}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                      stroke="#737380"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Question>
            );
          }
        )}
      </main>
    </div>
  );
}

export default Room;
