// import { Resolvers } from "@src/types/resolvers";
// import privateResolver from "@src/utils/privateResolver";
// import { RequestCoupleResponse } from "@src/types/graph";
// import User from "@src/entities/User";
// import Couple from "@src/entities/Couple";

// const resolvers: Resolvers = {
//   Mutation: {
//     RequestCouple: privateResolver(
//       async (_, args, { req }): Promise<RequestCoupleResponse> => {
//         const user: User = req.user;
//         if (!user.isProposed && !user.isAccepted) {
//           try {
//             const couple = await Couple.create({
//               ...args,
//               passenger: user
//             }).save();
//             user.isProposed = true;
//             user.save();
//             return {
//               ok: true,
//               error: null,
//               couple
//             };
//           } catch (error) {
//             return {
//               ok: false,
//               error: error.message,
//               couple: null
//             };
//           }
//         } else {
//           return {
//             ok: false,
//             error: "Error!!!",
//             couple: null
//           };
//         }
//       }
//     )
//   }
// };

// export default resolvers;
