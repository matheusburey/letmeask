import { onValue, push, ref, set } from "firebase/database";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import { AuthUse } from "../providers/Auth";
import { database } from "../services/firebase";

import "../style/auth.scss";

function NewRoom() {
  const { user } = AuthUse();
  const [nameRoom, setnameRoom] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();
    if (!nameRoom.trim()) {
      return;
    }
    await set(push(ref(database, "rooms")), {
      title: nameRoom,
      authorId: user?.id,
    });
    onValue(ref(database, "rooms"), (data) => {
      const room = Object.keys(data.val());
      const roomId = room[room.length - 1];
      navigate(`/admin/rooms/${roomId}`);
    });
  };

  return (
    <div id="page_auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div>
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              value={nameRoom}
              onChange={(event) => setnameRoom(event.target.value)}
              type="text"
              placeholder="Nome da sala"
            />
            <Button>Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default NewRoom;
