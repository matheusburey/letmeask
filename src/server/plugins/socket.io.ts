import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { QuestionSchema } from "~/models/question.schema";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on("connection", (socket) => {
    socket.on("join-room", async (data) => {
      const { roomId } = data;

      socket.join(roomId);

      io.to(roomId).emit("all-questions", await QuestionSchema.find({ room_id: roomId }));

      socket.on("create-new-question", async (question) => {
        const newQuestion = await new QuestionSchema({
          description: question.description,
          room_id: roomId,
          is_highlighted: false,
          is_answered: false,
          like_count: 0,
          user: {
            name: "User",
            avatar: "",
            _id: "",
          },
        }).save();

        io.to(roomId).emit("new-question", newQuestion);
      });
    });
  });

  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          const nodeContext = peer.ctx.node;
          const req = nodeContext.req;

          // @ts-expect-error private method
          engine.prepare(req);

          const rawSocket = nodeContext.req.socket;
          const websocket = nodeContext.ws;

          // @ts-expect-error private method
          engine.onWebSocket(req, rawSocket, websocket);
        },
      },
    }),
  );
});
