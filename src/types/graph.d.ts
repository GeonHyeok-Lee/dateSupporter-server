export const typeDefs = ["type FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  FacebookConnect(firstName: String, lastName: String, email: String, fbId: String!): FacebookConnectResponse!\n}\n\ntype User {\n  id: Int!\n  fbId: String\n  email: String\n  firstName: String\n  lastName: String\n  fullName: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n}\n\ntype Query {\n  user: User\n}\n"];
/* tslint:disable */

export interface Query {
  user: User | null;
}

export interface User {
  id: number;
  fbId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
}

export interface Mutation {
  FacebookConnect: FacebookConnectResponse;
}

export interface FacebookConnectMutationArgs {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  fbId: string;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}
