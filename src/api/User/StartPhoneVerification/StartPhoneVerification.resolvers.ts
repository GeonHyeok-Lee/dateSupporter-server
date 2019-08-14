import { Resolvers } from "@src/types/resolvers";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse
} from "@src/types/graph";
import Verification from "@src/entities/Verification";
import { sendVerificationSMS } from "@src/utils/sendSMS";
import User from "@src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs,
      { req }
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args;
      const user: User = req.user;
      try {
        const existingVerification = await Verification.findOne({
          payload: phoneNumber
        });
        if (existingVerification) {
          existingVerification.remove();
        }
        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: "PHONE",
          verificationUserId: user.id
        }).save();
        await sendVerificationSMS(newVerification.payload, newVerification.key);
        return {
          ok: true,
          error: null
        };
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
