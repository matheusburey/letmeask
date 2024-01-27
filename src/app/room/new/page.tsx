"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'

import logoImg from "@/assets/logo.svg";
import { Aside, Button, Input } from "@/components";

export default function NewRoom() {
  const router = useRouter();
  const [nameRoom, setNameRoom] = useState("");

  const handleCreateRoom = async () => {
    const newRoomName = nameRoom.trim();
    try {
      const res = await fetch("/api/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newRoomName }),
      });
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }
      const data = await res.json();
      router.push(`/room/${data.roomId}/admin`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Aside />
      <main className="basis-1/2 flex justify-center items-center">
        <div className="max-w-80 w-full flex flex-col">
          <Link href="/" className="mx-auto mb-20">
            <Image width={170} src={logoImg} alt="Cruel doubt" />
          </Link>
          <h2 className="text-center font-poppins font-bold text-2xl mb-4">
            Criar uma nova sala
          </h2>
          <Input
            value={nameRoom}
            onChange={setNameRoom}
            placeholder="Nome da sala"
          />
          <Button disabled={!nameRoom} onClick={handleCreateRoom} >
            Criar sala
          </Button>

          <p className="text-gray-400 text-sm mt-4">
            Quer entrar em uma sala existente?
            <Link href="/" className="text-purple-600"> clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}