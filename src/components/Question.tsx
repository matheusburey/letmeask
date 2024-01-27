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
    <div

    >
      <p>{content}</p>
      <div >
        <div >
          {/* <Avatar name={author.name} src={author.avatar} size="sm" mr="2" /> */}
          <p>
            {author.name}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Question;
