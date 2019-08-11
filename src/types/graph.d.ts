export const typeDefs = ["type FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  FacebookConnect(firstName: String, lastName: String, email: String!, fbId: String!): FacebookConnectResponse!\n  GoogleConnect(firstName: String, lastName: String, email: String!, googleId: String!): GoogleConnectResponse!\n  KakaoConnect(firstName: String, lastName: String, name: String, email: String!, kakaoId: String!): KakaoConnectResponse!\n  NaverConnect(firstName: String, lastName: String, name: String, email: String!, naverId: String!): NaverConnectResponse!\n}\n\ntype GoogleConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype KakaoConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype NaverConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: Int!\n  fbId: String\n  googleId: String\n  kakaoId: String\n  naverId: String\n  email: String\n  name: String\n  firstName: String\n  lastName: String\n  fullName: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n}\n\ntype Query {\n  user: User\n}\n"];
/* tslint:disable */

export interface Query {
  user: User | null;
}

export interface User {
  id: number;
  fbId: string | null;
  googleId: string | null;
  kakaoId: string | null;
  naverId: string | null;
  email: string | null;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
}

export interface Mutation {
  FacebookConnect: FacebookConnectResponse;
  GoogleConnect: GoogleConnectResponse;
  KakaoConnect: KakaoConnectResponse;
  NaverConnect: NaverConnectResponse;
}

export interface FacebookConnectMutationArgs {
  firstName: string | null;
  lastName: string | null;
  email: string;
  fbId: string;
}

export interface GoogleConnectMutationArgs {
  firstName: string | null;
  lastName: string | null;
  email: string;
  googleId: string;
}

export interface KakaoConnectMutationArgs {
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  email: string;
  kakaoId: string;
}

export interface NaverConnectMutationArgs {
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  email: string;
  naverId: string;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface GoogleConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface KakaoConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface NaverConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}
