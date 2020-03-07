import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetChatQueryArgs, GetChatResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
  Query: {
    GetChat: privateResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne(
            {
              id: args.chatId
            },
            { relations: ["messages"] },
          );
          const messages = await Message.find({ where: { chatId: args.chatId }, order: { createdAt: "DESC" } });
          if (chat && messages) {
            if (
              chat.requestUserId === user.id ||
              chat.acceptUserId === user.id
            ) {
              return {
                ok: true,
                error: null,
                chat,
                messages: chat.messages
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized to see this chat",
                chat: null,
                messages: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Not found",
              chat: null,
              messages: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            chat: null,
            messages: null
          };
        }
      }
    )
  }
};

export default resolvers;
