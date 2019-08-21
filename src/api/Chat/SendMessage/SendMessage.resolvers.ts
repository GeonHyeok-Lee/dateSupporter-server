import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import { SendMessageMutationArgs, SendMessageResponse } from "@src/types/graph";
import User from "@src/entities/User";
import Chat from "@src/entities/Chat";
import Message from "@src/entities/Message";

const resolvers: Resolvers = {
  Mutation: {
    SendMessage: privateResolver(
      async (
        _,
        args: SendMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendMessageResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne({ id: args.chatId });
          if (chat) {
            if (chat.acceptUserId === user.id) {
              const message: any = await Message.create({
                text: args.text,
                chat,
                acceptUserName: user.fullName
              }).save();
              pubSub.publish("newMessage", {
                MessageSubscription: message
              });
              return {
                ok: true,
                error: null,
                message
              };
            } else if (chat.requestUserId === user.id) {
              const message: any = await Message.create({
                text: args.text,
                requestUserName: user.name,
                chat
              }).save();
              pubSub.publish("newMessage", {
                MessageSubscription: message
              });
              return {
                ok: true,
                error: null,
                message
              };
            } else {
              return {
                ok: false,
                error: "Unauthorized",
                message: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Chat not found",
              message: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            message: null
          };
        }
      }
    )
  }
};

export default resolvers;
