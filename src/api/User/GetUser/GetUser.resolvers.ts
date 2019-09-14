import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetUser: privateResolver(async (_, __, { req }) => {
      const user: User = req.user;
      return {
        ok: true,
        error: null,
        user
      };
    }),
    GetCoupleIdFromUser: privateResolver(async (_, __, { req }) => {
      const user: User = req.user;
      return {
        ok: true,
        error: null,
        user
      };
    })
  }
};

export default resolvers;
