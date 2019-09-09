import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import { EditPlaceMutationArgs, EditPlaceResponse } from "@src/types/graph";
import Couple from "@src/entities/Couple";
import Place from "@src/entities/Place";
import cleanNullArgs from "@src/utils/cleanNullArgs";

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
                error: "place와 couple의 Id값이 일치하지 않아요.."
              };
            }
          } else {
            return {
              ok: false,
              error: "장소 혹은 커플을 못 찾았어요.."
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: "뭐야!!"
          };
        }
      }
    )
  }
};

export default resolvers;
