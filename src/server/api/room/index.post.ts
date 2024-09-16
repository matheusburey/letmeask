import { RoomSchema } from "~/models/room.schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const slug = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10),
    ).join("");
    return await new RoomSchema({ title: body.title, slug }).save();
  } catch (error) {
    return error;
  }
});
