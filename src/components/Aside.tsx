import illustrationImg from "../assets/illustration.svg";
import Image from "next/image";

function Aside() {
  return (
    <aside className="bg-purple-600 flex flex-col justify-center text-white px-20 gap-4 basis-1/2">
      <Image
        width="320"
        src={illustrationImg}
        alt="Ilustração simbolizando perguntas e respostas"
      />
      <p className="font-bold text-4xl font-poppins">
        Crie salas de Q&amp;A ao-vivo
      </p>
      <p className="text-2xl">Tire as dúvidas da sua audiência em tempo-real</p>
    </aside>
  );
}

export default Aside;
