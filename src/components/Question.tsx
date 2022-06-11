import { ReactNode } from "react";
import "../style/question.scss";

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
    <div
      className={`question ${isAnswered ? "answered" : ""} 
      ${isHighlighted ? "highlighted" : ""}`}
    >
      <p>{content}</p>
      <footer>
        <div className="user_info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}

Question.defaultProps = {
  isAnswered: false,
  isHighlighted: false,
};

export default Question;
