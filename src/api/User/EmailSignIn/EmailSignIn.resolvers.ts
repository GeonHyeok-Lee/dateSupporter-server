import User from "@src/entities/User";
import { EmailSignInMutationArgs, EmailSignInResponse } from "@src/types/graph";
import createJWT from "@src/utils/createJWT";

const resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({
          signUpEmail: email
        });
        if (!user) {
          return {
            ok: false,
            error: "이메일 계정을 찾지 못 했어요..",
            token: null
          };
        }
        const checkPassword = user.password === password;
        // const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: false,
            error: "패스워드가 틀려요..",
            token: null
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
