"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation'

import logoImg from "@/assets/logo.svg";
import { Aside, Button, Input } from "@/components";

export default function Home() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");

  const clickButtonJoinRoom = async () => {
    const roomId = roomCode.trim();
    try {
      const res = await fetch(`/api/room/${roomId}`);
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }
      const data = await res.json();
      router.push(`/room/${data.data._id}`);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(process.env.VITE_API_URL)

  return (
    <div className="flex min-h-screen">
      <Aside />
      <main className="basis-1/2 flex justify-center items-center">
        <div className="max-w-80 w-full flex flex-col">
          <Image className="mx-auto mb-20" width={170} src={logoImg} alt="Cruel doubt" />
          <Link
            href="/room/new"
            className="text-center border border-black hover:bg-gray-50 py-2 rounded"
          >
            Crie sua sala
          </Link>
          <div className="flex justify-center items-center my-8">
            <hr className="basis-1/5" />
            <p className="text-gray-300 basis-3/5 text-center">ou entre em uma sala</p>
            <hr className="basis-1/5" />
          </div>
          <Input
            value={roomCode}
            onChange={setRoomCode}
            placeholder="Digite o código da sala"
          />
          <Button
            disabled={!roomCode}
            onClick={clickButtonJoinRoom}
          >
            Entrar na sala
          </Button>
        </div>
      </main>
    </div>
  );
}
