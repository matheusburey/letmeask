import { FiCopy } from "react-icons/fi";

import Image from "next/image";
import logoImg from "../assets/logo.svg";
import Link from "next/link";

interface IHeaderProps {
  id: string;
  admin?: boolean;
}

export default function Header({ id, admin = false }: IHeaderProps) {
  const handleEndRoom = () => {
    if (window.confirm("voce realmente deseja encerar esta sala")) {
      // deleteRoom(id)
    }
  };

  const copyRoomCode = () => {
    const type = "text/plain";
    const blob = new Blob([id], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data);
  };

  return (
    <header className="border-b border-gray-300 p-6">
      <div className="flex items-center justify-between max-w-5xl mx-auto px-4 pt-6">
        <Link href="/">
          <Image width={160} src={logoImg} alt="Cruel doubt" />
        </Link>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 border border-blue-500 hover:bg-blue-100 py-2 px-4 rounded"
            onClick={copyRoomCode}
          >
            <FiCopy size={16} /> Sala #{id}
          </button>
          {admin && (
            <button className="border border-red-500 hover:bg-red-100 text-red-500 py-2 px-4 rounded" onClick={handleEndRoom}>
              Encerar sala
            </button>
          )}
        </div>
      </div>
    </header>
  );
}


