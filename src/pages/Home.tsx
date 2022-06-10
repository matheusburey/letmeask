import { get, child, ref } from "firebase/database";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import googleIconImg from "../assets/images/google-icon.svg";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import { AuthUse } from "../providers/Auth";
import { database } from "../services/firebase";

import "../style/auth.scss";

function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = AuthUse();
  const [roomCode, setRoomCode] = useState("");

  const handleCreateRoom = () => {
    if (!user) {
      signInWithGoogle();
    }
    navigate("/rooms/new");
  };

  const joinRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (!roomCode.trim()) {
      return;
    }
    const room = await get(child(ref(database), `rooms/${roomCode}`));
    if (!room.val()) {
      console.log("sala nao existe");
      return;
    }
    navigate(`rooms/${roomCode}`);
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
          <button
            onClick={handleCreateRoom}
            className="create_room"
            type="button"
          >
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={joinRoom}>
            <input
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value)}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
