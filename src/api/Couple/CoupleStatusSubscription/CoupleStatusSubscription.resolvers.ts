import { withFilter } from "graphql-yoga";
import User from "@src/entities/User";

const resolvers = {
  Subscription: {
    CoupleStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("coupleUpdate"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            CoupleStatusSubscription: { acceptUserId, requestUserId }
          } = payload;
          return user.id === acceptUserId || user.id === requestUserId;
        }
      )
    }
  }
};

export default resolvers;
