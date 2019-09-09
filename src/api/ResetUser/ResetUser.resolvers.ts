import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import { ResetUserResponse } from "@src/types/graph";

const resolvers: Resolvers = {
  Mutation: {
    ResetUser: privateResolver(
      async (_, __, { req }): Promise<ResetUserResponse> => {
        const { user } = req;
        try {
          if (user) {
            user.isRequested = false;
            user.isAccepted = false;
            user.isCouple = false;
            user.coupleId = null;
            await user.save();
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "유저 못 찾았어요.."
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
