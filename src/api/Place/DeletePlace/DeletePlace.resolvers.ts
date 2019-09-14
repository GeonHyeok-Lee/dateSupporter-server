import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  DeletePlaceMutationArgs,
  DeletePlaceResponse
} from "../../../types/graph";
import Couple from "../../../entities/Couple";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
  Mutation: {
    DeletePlace: privateResolver(
      async (
        _,
        args: DeletePlaceMutationArgs,
        ___
      ): Promise<DeletePlaceResponse> => {
        const couple = await Couple.findOne({ id: args.coupleId });
        const place = await Place.findOne({ id: args.placeId });
        try {
          if (place && couple) {
            if (place.coupleId === couple.id) {
              place.remove();
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
              error: "장소를 못 찾았어요.."
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
