import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Couple from "../../../entities/Couple";
import Chat from "../../../entities/Chat";
import {
  UpdateCoupleStatusMutationArgs,
  UpdateCoupleStatusResponse
} from "../../../types/graph";
import Place from "../../../entities/Place";
import Message from "../../../entities/Message";

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
        try {
          if (user) {
            if (args.status === "ACCEPTED") {
              const couple = await Couple.findOne(
                {
                  id: coupleId,
                  status: "REQUESTING"
                },
                { relations: ["requestUser", "acceptUser"] }
              );
              if (couple) {
                user.isAccepted = true;
                user.isCouple = true;
                user.coupleId = couple.id;
                await user.save();

                couple.acceptUser = user;
                await couple.save();
                couple.requestUser.isCouple = true;
                await couple.requestUser.save();

                const chat: Chat = await Chat.create({
                  couple,
                  coupleId: couple.id,
                  acceptUser: user,
                  requestUser: couple.requestUser
                }).save();
                couple.chat = chat;
                couple.status = args.status;
                await couple.save();
                await pubSub.publish("coupleUpdate", {
                  CoupleStatusSubscription: couple
                });
                return {
                  ok: true,
                  error: null,
                  couple
                };
              } else {
                return {
                  ok: false,
                  error: "Can't find couple data",
                  couple: null
                }
              }
            } else if (args.status === "FINISHED") {
              const couple = await Couple.findOne(
                {
                  id: args.coupleId,
                  status: "ACCEPTED"
                },
                { relations: ["requestUser", "acceptUser"] }
              );
              if (couple) {
                const requestUser = couple.requestUser;
                const acceptUser = couple.acceptUser;
                const chat = await Chat.findOne({ coupleId: couple.id });
                const places = await Place.find({ coupleId: couple.id });
                if (!chat) throw Error("Can't find chat data");
                if (!places) throw Error("Can't find places data");
                const messages = await Message.find({ chatId: chat.id });
                if (!messages) throw Error("Can't find messages data");
                places.forEach(async (place) => await place.remove());
                messages.forEach(async (message) => await message.remove());
                if (user.id === acceptUser.id) {
                  requestUser.isAccepted = false;
                  requestUser.isRequested = false;
                  requestUser.isCouple = false;
                  requestUser.coupleId = -9999;
                  await requestUser.save();
                } else {
                  acceptUser.isAccepted = false;
                  acceptUser.isRequested = false;
                  acceptUser.isCouple = false;
                  acceptUser.coupleId = -9999;
                  await acceptUser.save();
                }
                user.isAccepted = false;
                user.isRequested = false;
                user.isCouple = false;
                user.coupleId = -9999;
                await user.save();
                await couple.remove();
                await chat.remove();
                return {
                  ok: true,
                  error: null,
                  couple: null
                };
              } else {
                return {
                  ok: false,
                  error: "Can't find couple data",
                  couple: null
                }
              }
            } else {
              return {
                ok: false,
                error: "Can't find status argument",
                couple: null
              }
            }
          } else {
            return {
              ok: false,
              error: "Can't find user data",
              couple: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            couple: null
          };
        }
      })
  }
};

export default resolvers;
