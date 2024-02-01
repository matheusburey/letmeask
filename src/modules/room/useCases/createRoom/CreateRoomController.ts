import { NextRequest, NextResponse } from "next/server";

import { z, ZodError } from "zod";

import { Database } from '@/config/database';
import RoomRepository from "../../repositories/implementation/RoomRepository";
import CreateRoomUseCase from "./CreateRoomUseCases";

const schema = z.object({
  title: z.string()
});

export default class CreateRoomController {
  async handle(req: NextRequest) {
    try {
      const { title } = await schema.parseAsync(await req.json());
      const database = await new Database().connect()
      const roomRepository = new RoomRepository(database.db)
      const roomUseCase = new CreateRoomUseCase(roomRepository)
      const room = await roomUseCase.execute(title)
      return NextResponse.json({data: room})
    } catch (error: any) {
      if (error instanceof ZodError) {
        return NextResponse.json({ errors: error.issues }, { status: 400 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }
}