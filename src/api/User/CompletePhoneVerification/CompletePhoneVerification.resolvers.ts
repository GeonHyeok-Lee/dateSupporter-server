import { Resolvers } from "../../../types/resolvers";
import {
  CompletePhoneVerificationResponse,
  CompletePhoneVerificationMutationArgs
} from "../../../types/graph";
import User from "../../../entities/User";
import PhoneVerification from "../../../entities/PhoneVerification";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs,
      { req }
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      const reqUser: User = req.user;
      try {
        const verification = await PhoneVerification.findOne({
          phoneNumber,
          key,
          phoneVerificationUserId: reqUser.id
        });
        if (!verification) {
          return {
            ok: false,
            error: "Not findOne Verification"
          };
        } else {
          verification.verified = true;
          verification.save();
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
      try {
        const user = await User.findOne({ id: reqUser.id });
        if (user) {
          user.phoneNumber = phoneNumber;
          user.verifiedPhone = true;
          user.save();
          return {
            ok: true,
            error: null
          };
        } else {
          return {
            ok: false,
            error: "Not findOne userId"
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
