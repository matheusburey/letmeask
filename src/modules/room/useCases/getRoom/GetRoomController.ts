import { NextRequest, NextResponse } from "next/server";

import { z, ZodError } from "zod";

import { Database } from '@/config/database';
import RoomRepository from "../../repositories/implementation/RoomRepository";
import GetRoomUseCase from "./GetRoomUseCases";

const schema = z.object({
  roomId: z.string()
});

export default class GetRoomController {
  async handle(req: NextRequest, { params }: { params: { roomId: string } }) {
    try {
      const { roomId } = await schema.parseAsync(params);
      const database = await new Database().connect()
      const roomRepository = new RoomRepository(database.db)
      const roomUseCase = new GetRoomUseCase(roomRepository)
      const room = await roomUseCase.execute(roomId)
      return NextResponse.json({data: room})
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ errors: error.issues }, { status: 400 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }
}