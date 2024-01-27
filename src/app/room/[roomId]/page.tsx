"use client";
import { useEffect, useState } from "react";
// import { AiOutlineLike } from "react-icons/ai";

import { Button, Header, Question } from "@/components";

export default function Room({ params }: { params: { roomId: string } }) {
  const { user } = { user: { name: "" } };
  const { title, questions } = { title: "React", questions: [] };
  const [newQuestion, setNewQuestion] = useState("");
  const [conn, setConn] = useState<WebSocket>();

  const handleLike = async (questionId = "", likeId = "") => {
    if (!likeId) {
      console.log("like");
    } else {
      console.log("remove like");
    }
  };

  const handleSubmitNewQuestion = async () => {
    const newQuestionText = newQuestion.trim();
    if (newQuestionText && conn) {
      // sendQuestion(conn, newQuestionText);
    }
    setNewQuestion("");
  };

  return (
    <>
      <Header id={params.roomId} />
      <main className="max-w-4xl w-full flex flex-col px-8 mx-auto">
        <div className="flex justify-between items-center my-8">
          <h1 className="text-2xl font-bold font-poppins">
            Sala {title}
          </h1>
          {!!questions?.length &&
            <div>
              {questions?.length} perguntas
            </div>
          }
        </div>

        <textarea
          placeholder="Qual sua pergunta?"
          className="w-full resize-none rounded p-4 text-lg leading-relaxed shadow-md"
          value={newQuestion}
          onChange={(event) => setNewQuestion(event.target.value)}
        />

        <div className="flex justify-between items-center my-8">
          {user ? (
            <div >
              <strong>{user.name}</strong>
              {/* <Avatar name={user.name} src={user.avatar} size="sm" mr="2" /> */}
              <span>{user.name}</span>
            </div>
          ) : (
            <p>
              Para enviar uma pergunta
              <button
              >
                faça seu login
              </button>
            </p>
          )}
          <div className="w-44">
            <Button
              onClick={handleSubmitNewQuestion}
              disabled={!newQuestion}
            >
              Enviar pergunta
            </Button>
          </div>
        </div>
        <div>
          {questions?.map(
            ({
              id,
              isHighlighted,
              isAnswered,
              description,
              likeCount,
              likeId,
            }) => {
              return (
                <Question
                  key={id}
                  isAnswered={isAnswered}
                  isHighlighted={isHighlighted}
                  author={{ name: "Anonimo", avatar: "", id: `${id}1` }}
                  content={description}
                >
                  <button
                    onClick={() => handleLike(id, likeId)}
                    disabled={!user}
                  >
                    {!!likeCount && (
                      <p>
                        {likeCount}
                      </p>
                    )}
                  </button>
                </Question>
              );
            },
          )}
        </div>
      </main>
    </>
  );
}
