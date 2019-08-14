export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]\n  acceptedUser: User!\n  acceptedId: Int!\n  proposedUser: User!\n  proposedId: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype GetCoupleResponse {\n  ok: Boolean!\n  error: String\n  couple: Couple\n}\n\ntype Query {\n  GetCouple(coupleId: Int!): GetCoupleResponse!\n}\n\ntype RequestCoupleResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  RequestCouple: RequestCoupleResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  FacebookConnect(firstName: String, lastName: String, email: String!, fbId: String!): FacebookConnectResponse!\n  GoogleConnect(firstName: String, lastName: String, email: String!, googleId: String!): GoogleConnectResponse!\n  KakaoConnect(firstName: String, lastName: String, name: String, email: String!, kakaoId: String!): KakaoConnectResponse!\n  NaverConnect(firstName: String, lastName: String, name: String, email: String!, naverId: String!): NaverConnectResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n}\n\ntype Couple {\n  id: Int!\n  chat: Chat\n  proposedUser: User\n  proposedUserId: Int!\n  acceptedUser: User\n  acceptedUserId: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  chatId: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GoogleConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype KakaoConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype NaverConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: Int!\n  fbId: String!\n  googleId: String!\n  kakaoId: String!\n  naverId: String!\n  email: String!\n  name: String!\n  firstName: String!\n  lastName: String!\n  fullName: String!\n  phoneNumber: String!\n  isProposed: Boolean!\n  isAccepted: Boolean!\n  verifiedPhoneNumber: Boolean!\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String!\n  verificationUser: User\n  verificationUserId: Int!\n}\n"];
/* tslint:disable */

export interface Query {
  GetCouple: GetCoupleResponse;
}

export interface GetCoupleQueryArgs {
  coupleId: number;
}

export interface GetCoupleResponse {
  ok: boolean;
  error: string | null;
  couple: Couple | null;
}

export interface Couple {
  id: number;
  chat: Chat | null;
  proposedUser: User | null;
  proposedUserId: number;
  acceptedUser: User | null;
  acceptedUserId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  acceptedUser: User;
  acceptedId: number;
  proposedUser: User;
  proposedId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  chatId: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  fbId: string;
  googleId: string;
  kakaoId: string;
  naverId: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  isProposed: boolean;
  isAccepted: boolean;
  verifiedPhoneNumber: boolean;
}

export interface Mutation {
  RequestCouple: RequestCoupleResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  FacebookConnect: FacebookConnectResponse;
  GoogleConnect: GoogleConnectResponse;
  KakaoConnect: KakaoConnectResponse;
  NaverConnect: NaverConnectResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
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

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface RequestCoupleResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
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

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  verificationUser: User | null;
  verificationUserId: number;
}
