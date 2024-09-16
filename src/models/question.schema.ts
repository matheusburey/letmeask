import { defineMongooseModel } from "#nuxt/mongoose";

export const QuestionSchema = defineMongooseModel({
  name: "Question",
  schema: {
    user: {
      type: "object",
      required: true,
      properties: {
        name: {
          type: "string",
          required: true,
        },
        avatar: {
          type: "string",
          required: true,
        },
        _id: {
          type: "string",
          required: true,
        },
      },
    },
    description: {
      type: "string",
      required: true,
    },
    room_id: {
      type: "string",
      required: true,
    },
    is_highlighted: {
      type: "boolean",
      required: true,
    },
    is_answered: {
      type: "boolean",
      required: true,
    },
    like_count: {
      type: "number",
      required: true,
    },
  },
});
