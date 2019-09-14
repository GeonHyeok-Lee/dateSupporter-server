import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { AddPlaceMutationArgs, AddPlaceResponse } from "../../../types/graph";
import Couple from "../../../entities/Couple";
import Place from "../../../entities/Place";
import User from "../../../entities/User";

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
