import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import User from "@src/entities/User";
import Couple from "@src/entities/Couple";
import Chat from "@src/entities/Chat";
import {
  UpdateCoupleStatusMutationArgs,
  UpdateCoupleStatusResponse
} from "@src/types/graph";
import Place from "@src/entities/Place";
import Message from "@src/entities/Message";

const resolvers: Resolvers = {
  Mutation: {
    UpdateCoupleStatus: privateResolver(
      async (
        _,
        args: UpdateCoupleStatusMutationArgs,
        { req, pubSub }
      ): Promise<UpdateCoupleStatusResponse> => {
        const { coupleId } = args;
        const user: User = req.user;
        // 임시로 바꿔놓은 것 나중에 "!" 빼세요..
        if (!user.isRequested || !user.isAccepted) {
          try {
            let couple: any;
            if (args.status === "ACCEPTED") {
              couple = await Couple.findOne(
                {
                  id: coupleId,
                  status: "REQUESTING"
                },
                { relations: ["requestUser", "acceptUser"] }
              );
              if (couple) {
                couple.acceptUser = user;
                user.isAccepted = true;
                await user.save();
                const acceptUser: User = couple.acceptUser;
                const requestUser: User = couple.requestUser;
                const chat: Chat = await Chat.create({
                  couple,
                  requestUserId: requestUser.id,
                  acceptUserId: acceptUser.id
                }).save();
                couple.chat = chat;
                await couple.save();
              }
            } else {
              couple = await Couple.findOne(
                {
                  id: args.coupleId,
                  acceptUser: user
                },
                { relations: ["requestUser", "acceptUser"] }
              );
              if (args.status === "FINISHED") {
                let messages;
                const requestUser: User = couple.requestUser;
                const chat = await Chat.findOne({ coupleId: couple.id });
                const places = await Place.find({ coupleId: couple.id });
                if (chat) {
                  messages = await Message.find({ chatId: chat.id });
                }
                if (places) {
                  await places.forEach(place => place.remove());
                }
                if (messages) {
                  await messages.forEach(message => message.remove());
                }
                if (chat) {
                  await chat.remove();
                }
                await couple.remove();
                user.isAccepted = false;
                user.isRequested = false;
                requestUser.isAccepted = false;
                requestUser.isRequested = false;
                await user.save();
                await requestUser.save();
                return {
                  ok: true,
                  error: null
                };
              }
            }
            if (couple) {
              couple.status = args.status;
              await couple.save();
              pubSub.publish("coupleUpdate", {
                CoupleStatusSubscription: couple
              });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "커플 정보를 갱신 할 수 없어요.."
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "이미 커플이에요.."
          };
        }
      }
    )
  }
};

export default resolvers;
