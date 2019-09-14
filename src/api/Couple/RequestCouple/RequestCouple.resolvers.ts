import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  RequestCoupleResponse,
  RequestCoupleMutationArgs
} from "../../../types/graph";
import User from "../../../entities/User";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Mutation: {
    RequestCouple: privateResolver(
      async (
        _,
        args: RequestCoupleMutationArgs,
        { req, pubSub }
      ): Promise<RequestCoupleResponse> => {
        const { phoneNumber } = args;
        const user: User = req.user;
        if (!user.isRequested && !user.isAccepted && !user.isCouple) {
          try {
            const couple = await Couple.create({
              ...args,
              requestPhoneNumber: user.phoneNumber,
              acceptPhoneNumber: phoneNumber,
              requestUser: user
            }).save();
            pubSub.publish("ReqCouple", {
              RequestCoupleSubscription: couple
            });
            user.isRequested = true;
            user.coupleId = couple.id;
            await user.save();
            return {
              ok: true,
              error: null,
              couple
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              couple: null
            };
          }
        } else {
          return {
            ok: false,
            error: "이미 커플이에요..",
            couple: null
          };
        }
      }
    )
  }
};

export default resolvers;
