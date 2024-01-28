"use client";
import { useEffect } from "react";
// import { AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";
// import { RiQuestionAnswerLine } from "react-icons/ri";

import Header from "@/components/Header";
import Question from "@/components/Question";

export default function AdminRoom({ params }: { params: { roomId: string } }) {
  const { title, questions } = { title: "React", questions: [] };

  const handleDeleteQuestion = (questionId = "") => {
    if (
      window.confirm("voce realmente deseja excluir essa pergunta") &&
      questionId
    ) {
      console.log(`rooms/${params.roomId}/questions/${questionId}`);
    }
  };

  const handleHighlightQuestion = (questionId = "") => {
    if (questionId) {
      console.log(`rooms/${params.roomId}/questions/${questionId}`, {
        isHighlighted: true,
      });
    }
  };

  const handleCheckQuestionAnswer = (questionId = "") => {
    if (questionId) {
      console.log(`rooms/${params.roomId}/questions/${questionId}`, {
        isAnswered: true,
      });
    }
  };

  return (
    <>
      <Header id={params.roomId} admin />
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
        <div className="flex flex-col">
          {questions?.map(({ id, isHighlighted, isAnswered, description }) => {
            return (
              <Question
                key={id}
                author={{ name: "Anonimo", avatar: "", id: `${id}1` }}
                isHighlighted={isHighlighted}
                isAnswered={isAnswered}
                content={description}
              >
                <button
                />
                <button
                />
                <button
                />
              </Question>
            );
          })}
        </div>
      </main>
    </>
  );
}
