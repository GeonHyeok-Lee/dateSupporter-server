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
        { req }
      ): Promise<AddPlaceResponse> => {
        const user: User = req.user;
        const couple = await Couple.findOne({ id: args.coupleId });
        try {
          await Place.create({
            ...args,
            addUserId: user.id,
            couple
          }).save();
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
