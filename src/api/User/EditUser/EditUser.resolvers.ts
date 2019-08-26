import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import { EditUserMutationArgs, EditUserResponse } from "@src/types/graph";
import User from "@src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditUserMutationArgs,
        { req }
      ): Promise<EditUserResponse> => {
        const user: User = req.user;
        try {
          if (user) {
            if (user.id === args.userId) {
              if (args.userId !== null) {
                delete args.userId;
              }
              await User.update({ id: args.userId }, { ...args });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "유저의 Id값이 일치하지 않아요.."
              };
            }
          } else {
            return {
              ok: false,
              error: "유저를 못 찾았어요.."
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
