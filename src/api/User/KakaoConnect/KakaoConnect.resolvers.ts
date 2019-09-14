import {
  KakaoConnectMutationArgs,
  KakaoConnectResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    KakaoConnect: async (
      _,
      args: KakaoConnectMutationArgs
    ): Promise<KakaoConnectResponse> => {
      const { kakaoId } = args;
      try {
        const existingUser = await User.findOne({ kakaoId });
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
          ...args
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
