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
                error: "Couple Id값에 해당하는 유저를 못 찾았어요..",
                couple: null
              };
            }
          } else {
            return {
              ok: false,
              error: "해당 Couple이 존재하지 않아요..",
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
