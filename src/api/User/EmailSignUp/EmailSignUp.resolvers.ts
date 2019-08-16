import { Resolvers } from "@src/types/resolvers";
import { EmailSignUpMutationArgs, EmailSignUpResponse } from "@src/types/graph";
import User from "@src/entities/User";
import EmailVerification from "@src/entities/EmailVerification";
import { sendVerificationEmail } from "@src/utils/sendEmail";
import createJWT from "@src/utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { signUpEmail } = args;
      try {
        const existingUser = await User.findOne({ signUpEmail });
        if (existingUser) {
          return {
            ok: false,
            error: "이미 존재하는 이메일 입니다.",
            token: null
          };
        } else {
          const newUser = await User.create({
            email: signUpEmail,
            ...args
          }).save();
          if (newUser.signUpEmail) {
            const emailVerification = await EmailVerification.create({
              email: newUser.signUpEmail,
              target: "EMAIL"
            }).save();
            if (typeof newUser.name === "string") {
              await sendVerificationEmail(
                signUpEmail,
                newUser.name,
                emailVerification.key
              );
            }
          }
          const token = createJWT(newUser.id);
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
    }
  }
};

export default resolvers;
