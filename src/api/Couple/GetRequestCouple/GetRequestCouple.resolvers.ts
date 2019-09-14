import User from "../../../entities/User";
import Couple from "../../../entities/Couple";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetRequestCoupleResponse } from "../../../types/graph";
import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetRequestCouple: privateResolver(
      async (_, __, { req }): Promise<GetRequestCoupleResponse> => {
        const user: User = req.user;
        if (!user.isRequested && !user.isCouple) {
          const couple = await getRepository(Couple).findOne(
            {
              acceptPhoneNumber: user.phoneNumber,
              status: "REQUESTING"
            },
            { relations: ["requestUser"] }
          );
          try {
            if (couple) {
              return {
                ok: true,
                error: null,
                couple
              };
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
        } else {
          return {
            ok: false,
            error: "이미 누군가에게 요청한 상태예요.",
            couple: null
          };
        }
      }
    )
  }
};

export default resolvers;
