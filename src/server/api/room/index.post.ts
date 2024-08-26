import { RoomSchema } from "~/models/room.schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new RoomSchema(body).save();
  } catch (error) {
    return error;
  }
});
