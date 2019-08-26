import User from "@src/entities/User";
import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetUser: privateResolver(async (_, __, { req }) => {
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
