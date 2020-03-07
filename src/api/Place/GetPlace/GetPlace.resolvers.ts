import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetPlaceQueryArgs, GetPlaceResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";

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
          const places: Place[] = await Place.find({
            where: {
              coupleId: args.coupleId
            },
            order: {
              createdAt: "DESC"
            }
          })
          if (places) {
            if (args.coupleId === user.coupleId) {
              return {
                ok: true,
                error: null,
                places
              };
            } else {
              return {
                ok: false,
                error: "Can't match coupleId",
                places: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Not found places",
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
