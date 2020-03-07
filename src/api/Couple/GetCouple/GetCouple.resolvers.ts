import Couple from "../../../entities/Couple";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { GetCoupleQueryArgs, GetCoupleResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetCouple: privateResolver(
      async (
        _,
        args: GetCoupleQueryArgs,
        { req }
      ): Promise<GetCoupleResponse> => {
        const user: User = req.user;
        try {
          const couple: any = await Couple.findOne(
            {
              id: args.coupleId
            },
            { relations: ["chat", "requestUser", "acceptUser"] }
          );
          if (couple) {
            if (
              couple.requestUserId === user.id ||
              couple.acceptUserId === user.id
            ) {
              return {
                ok: true,
                error: null,
                couple
              };
            } else {
              return {
                ok: false,
                error: "Can't match user data",
                couple: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Not found couple",
              couple: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            couple: null
          };
        }
      }
    )
  }
};

export default resolvers;
