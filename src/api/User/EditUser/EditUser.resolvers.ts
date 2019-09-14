import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { EditUserMutationArgs, EditUserResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    EditUser: privateResolver(
      async (
        _,
        args: EditUserMutationArgs,
        { req }
      ): Promise<EditUserResponse> => {
        const user: User = req.user;
        try {
          if (user) {
            await User.update({ ...user }, { ...args });
            return {
              ok: true,
              error: null
            };
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
