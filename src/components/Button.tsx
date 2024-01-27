import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => Promise<void>;
}

function Button({ disabled = false, children, onClick }: IProps) {
  return (
    <button
      className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-3 w-full rounded disabled:bg-violet-200"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button