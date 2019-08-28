import { withFilter } from "graphql-yoga";
import User from "@src/entities/User";

const resolvers = {
  Subscription: {
    RequestCoupleSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("ReqCouple"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            RequestCoupleSubscription: { acceptedPhoneNumber }
          } = payload;
          const { phoneNumber } = user;
          return acceptedPhoneNumber === phoneNumber;
        }
      )
    }
  }
};

export default resolvers;
