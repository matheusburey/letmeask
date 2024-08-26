import { defineMongooseModel } from "#nuxt/mongoose";

export const RoomSchema = defineMongooseModel({
  name: "Room",
  schema: {
    title: {
      type: "string",
      required: true,
    },
    slug: {
      type: "string",
      required: true,
      unique: true,
    },
  },
});
