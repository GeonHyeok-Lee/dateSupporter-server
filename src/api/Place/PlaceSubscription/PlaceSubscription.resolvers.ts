import { withFilter } from "graphql-yoga";
import User from "@src/entities/User";
import Couple from "@src/entities/Couple";

const resolvers = {
  Subscription: {
    AddPlaceSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("addPlace"),
        async (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            AddPlaceSubscription: { coupleId }
          } = payload;
          try {
            const couple = await Couple.findOne({ id: coupleId });
            if (couple) {
              return (
                couple.acceptUser.id === user.id ||
                couple.requestUser.id === user.id
              );
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        }
      )
    },
    EditPlaceSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("editPlace"),
        async (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            EditPlaceSubscription: { coupleId }
          } = payload;
          try {
            const couple = await Couple.findOne({ id: coupleId });
            if (couple) {
              return (
                couple.acceptUser.id === user.id ||
                couple.requestUser.id === user.id
              );
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        }
      )
    },
    DeletePlaceSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("deletePlace"),
        async (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            DeletePlaceSubscription: { coupleId }
          } = payload;
          try {
            const couple = await Couple.findOne({ id: coupleId });
            if (couple) {
              return (
                couple.acceptUser.id === user.id ||
                couple.requestUser.id === user.id
              );
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        }
      )
    }
  }
};

export default resolvers;
