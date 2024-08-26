import { RoomSchema } from "~/models/room.schema";

export default defineEventHandler(async (event) => {
  try {
    return await RoomSchema.findOne({ slug: event.context.params?.slug });
  } catch (error) {
    return error;
  }
});
