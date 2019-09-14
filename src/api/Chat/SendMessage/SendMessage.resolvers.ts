import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  SendMessageMutationArgs,
  SendMessageResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";

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
            if (
              chat.acceptUserId === user.id ||
              chat.requestUserId === user.id
            ) {
              const message: any = await Message.create({
                text: args.text,
                chat,
                user
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
