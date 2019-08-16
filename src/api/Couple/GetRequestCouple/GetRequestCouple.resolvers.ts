// import { Resolvers } from "@src/types/resolvers";
// import privateResolver from "@src/utils/privateResolver";
// import User from "@src/entities/User";

// const resolvers: Resolvers = {
//   Query: {
//     GetNearbyRide: privateResolver(
//       async (_, __, { req }): Promise<> => {
//         const user: User = req.user;
//         if (user.isDriving) {
//           const { lastLat, lastLng } = user;
//           try {
//             const ride = await getRepository(Couple).findOne(
//               {
//                 status: "REQUESTING",
//                 pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
//                 pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
//               },
//               { relations: ["passenger"] }
//             );
//             if (ride) {
//               return {
//                 ok: true,
//                 error: null,
//                 ride
//               };
//             } else {
//               return {
//                 ok: true,
//                 error: null,
//                 ride: null
//               };
//             }
//           } catch (error) {
//             return {
//               ok: false,
//               error: error.message,
//               ride: null
//             };
//           }
//         } else {
//           return {
//             ok: false,
//             error: "You are not a driver",
//             ride: null
//           };
//         }
//       }
//     )
//   }
// };

// export default resolvers;
