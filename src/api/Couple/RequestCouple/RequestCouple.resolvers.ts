import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import {
  RequestCoupleResponse,
  RequestCoupleMutationArgs
} from "@src/types/graph";
import User from "@src/entities/User";
import Couple from "@src/entities/Couple";

const resolvers: Resolvers = {
  Mutation: {
    RequestCouple: privateResolver(
      async (
        _,
        args: RequestCoupleMutationArgs,
        { req, pubSub }
      ): Promise<RequestCoupleResponse> => {
        console.log(args);
        const { phoneNumber } = args;
        const user: User = req.user;
        if (!user.isRequested && !user.isAccepted) {
          try {
            const couple = await Couple.create({
              ...args,
              searchPhoneNumber: phoneNumber,
              requestUser: user
            }).save();
            pubSub.publish("coupleRequest", {
              RequestCoupleSubscription: couple
            });
            // user.isRequested = true;
            user.save();
            return {
              ok: true,
              error: null
            };
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
