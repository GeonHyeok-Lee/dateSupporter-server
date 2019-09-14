import {
  GoogleConnectMutationArgs,
  GoogleConnectResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    GoogleConnect: async (
      _,
      args: GoogleConnectMutationArgs
    ): Promise<GoogleConnectResponse> => {
      const { googleId, firstName, lastName } = args;
      try {
        const existingUser = await User.findOne({ googleId });
        if (existingUser) {
          const token = createJWT(existingUser.id);
          return {
            ok: true,
            error: null,
            token
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      try {
        const newUser = await User.create({
          ...args,
          nickname: `${firstName} ${lastName}`
        }).save();
        const token = createJWT(newUser.id);
        return {
          ok: true,
          error: null,
          token
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
