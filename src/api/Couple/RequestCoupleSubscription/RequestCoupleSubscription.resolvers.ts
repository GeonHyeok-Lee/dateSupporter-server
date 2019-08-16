import { withFilter } from "graphql-yoga";
import User from "@src/entities/User";

const resolvers = {
  Subscription: {
    RequestCoupleSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("coupleRequest"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            RequestCoupleSubscription: { searchPhoneNumber }
          } = payload;
          const { phoneNumber } = user;
          return searchPhoneNumber === phoneNumber;
        }
      )
    }
  }
};

export default resolvers;
