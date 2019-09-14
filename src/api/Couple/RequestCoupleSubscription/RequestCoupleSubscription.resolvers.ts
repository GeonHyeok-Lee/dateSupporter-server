import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    RequestCoupleSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("ReqCouple"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            RequestCoupleSubscription: { acceptPhoneNumber }
          } = payload;
          const { phoneNumber } = user;
          return acceptPhoneNumber === phoneNumber;
        }
      )
    }
  }
};

export default resolvers;
