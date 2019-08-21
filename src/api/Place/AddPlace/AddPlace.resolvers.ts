import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import { AddPlaceMutationArgs, AddPlaceResponse } from "@src/types/graph";
import Couple from "@src/entities/Couple";
import Place from "@src/entities/Place";
import User from "@src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    AddPlace: privateResolver(
      async (
        _,
        args: AddPlaceMutationArgs,
        { req, pubSub }
      ): Promise<AddPlaceResponse> => {
        const user: User = req.user;
        const couple: Couple = req.couple;
        try {
          const place = await Place.create({
            ...args,
            addUserId: user.id,
            couple
          }).save();
          pubSub.publish("addPlace", {
            AddPlaceSubscription: place
          });
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
    )
  }
};

export default resolvers;
