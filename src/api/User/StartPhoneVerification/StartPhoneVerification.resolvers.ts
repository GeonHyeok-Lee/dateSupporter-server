import { Resolvers } from "@src/types/resolvers";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse
} from "@src/types/graph";
import { sendVerificationSMS } from "@src/utils/sendSMS";
import User from "@src/entities/User";
import PhoneVerification from "@src/entities/PhoneVerification";

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
        const existingVerification = await PhoneVerification.findOne({
          phoneNumber
        });
        if (existingVerification) {
          existingVerification.remove();
        }
        const newVerification = await PhoneVerification.create({
          phoneNumber,
          target: "PHONE",
          phoneVerificationUserId: user.id
        }).save();
        await sendVerificationSMS(
          newVerification.phoneNumber,
          newVerification.key
        );
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