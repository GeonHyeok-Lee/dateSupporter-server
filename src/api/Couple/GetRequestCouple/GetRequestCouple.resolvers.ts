import User from "@src/entities/User";
import Couple from "@src/entities/Couple";
import { Resolvers } from "@src/types/resolvers";
import privateResolver from "@src/utils/privateResolver";
import { GetRequestCoupleResponse } from "@src/types/graph";
import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetRequestCouple: privateResolver(
      async (_, __, { req }): Promise<GetRequestCoupleResponse> => {
        const user: User = req.user;
        try {
          const couple: any = await getRepository(Couple).findOne(
            {
              acceptedPhoneNumber: user.phoneNumber,
              status: "REQUESTING"
            },
            { relations: ["requestUser", "acceptUser"] }
          );
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
      }
    )
  }
};

export default resolvers;
