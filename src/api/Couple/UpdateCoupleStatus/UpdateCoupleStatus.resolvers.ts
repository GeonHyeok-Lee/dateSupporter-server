import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import User from "@src/entities/User";
import Couple from "@src/entities/Couple";
import Chat from "@src/entities/Chat";
import {
  UpdateCoupleStatusMutationArgs,
  UpdateCoupleStatusResponse
} from "@src/types/graph";

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
        if (!user.isRequested && !user.isAccepted) {
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
                user.isAccepted = false;
                user.isRequested = false;
                await user.save();
                const requestUser: User = couple.requestUser;
                requestUser.isAccepted = false;
                requestUser.isRequested = false;
                await requestUser.save();
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
                error: null,
                coupleId: couple.id
              };
            } else {
              return {
                ok: false,
                error: "Can not update couple",
                coupleId: null
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              coupleId: null
            };
          }
        } else {
          return {
            ok: false,
            error: "You are already couple",
            coupleId: null
          };
        }
      }
    )
  }
};

export default resolvers;
