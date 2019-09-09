import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import Couple from "@src/entities/Couple";
import { GetPlaceQueryArgs, GetPlaceResponse } from "@src/types/graph";
import User from "@src/entities/User";

const resolvers: Resolvers = {
  Query: {
    GetPlace: privateResolver(
      async (
        _,
        args: GetPlaceQueryArgs,
        { req }
      ): Promise<GetPlaceResponse> => {
        const user: User = req.user;
        try {
          const couple: any = await Couple.findOne(
            { id: args.coupleId },
            { relations: ["places"] }
          );
          if (couple) {
            if (couple.id === user.coupleId) {
              return {
                ok: true,
                error: null,
                places: couple.places
              };
            } else {
              return {
                ok: false,
                error: "Id값이 매치되지 않아요..",
                places: null
              };
            }
          } else {
            return {
              ok: false,
              error: "해당 장소가 존재하지 않아요..",
              places: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            places: null
          };
        }
      }
    )
  }
};

export default resolvers;
