import privateResolver from "@src/utils/privateResolver";
import EmailVerification from "@src/entities/EmailVerification";
import { Resolvers } from "@src/types/resolvers";
import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse
} from "@src/types/graph";
import User from "@src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,
        { req }
      ): Promise<CompleteEmailVerificationResponse> => {
        const user: User = req.user;
        const { key } = args;
        if (user.signUpEmail) {
          try {
            const verification = await EmailVerification.findOne({
              key,
              email: user.signUpEmail
            });
            if (verification) {
              user.verifiedEmail = true;
              user.save();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "인증이 되지 않아요..😓"
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "리퀘스트에서 유저의 이메일 값을 받지 못했어요..😓"
          };
        }
      }
    )
  }
};

export default resolvers;
