import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import Couple from "../../../entities/Couple";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        ___
      ): Promise<EditPlaceResponse> => {
        const couple = await Couple.findOne({ id: args.coupleId });
        const place = await Place.findOne({ id: args.placeId });
        try {
          if (place && couple) {
            if (place.coupleId === couple.id) {
              const notNull: any = cleanNullArgs(args);
              if (notNull.placeId !== null) {
                delete notNull.placeId;
              }
              await Place.update({ id: args.placeId }, { ...notNull });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Can't match couple"
              };
            }
          } else {
            return {
              ok: false,
              error: "Not found place or couple data"
            };
          }
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
