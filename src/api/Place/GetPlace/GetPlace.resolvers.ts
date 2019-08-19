import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import Place from "@src/entities/Place";
import Couple from "@src/entities/Couple";
import { GetPlaceQueryArgs, GetPlaceResponse } from "@src/types/graph";

const resolvers: Resolvers = {
  Query: {
    GetPlace: privateResolver(
      async (
        _,
        args: GetPlaceQueryArgs,
        { req }
      ): Promise<GetPlaceResponse> => {
        const couple: Couple = req.couple;
        try {
          const place: any = await Place.findOne({
            id: args.placeId
          });
          if (place) {
            if (place.coupleId === couple.id) {
              return {
                ok: true,
                error: null,
                place
              };
            } else {
              return {
                ok: false,
                error: "Couple Id값에 해당하는 장소를 못 찾았어요..",
                place: null
              };
            }
          } else {
            return {
              ok: false,
              error: "해당 장소가 존재하지 않아요..",
              place: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            place: null
          };
        }
      }
    )
  }
};

export default resolvers;
