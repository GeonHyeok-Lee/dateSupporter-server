export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]\n  couple: Couple!\n  requestUserId: Int!\n  acceptUserId: Int!\n  requestUserName: String!\n  acceptUserName: String!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype Subscription {\n  CoupleStatusSubscription: Couple\n  RequestCoupleSubscription: Couple\n}\n\ntype GetCoupleResponse {\n  ok: Boolean!\n  error: String\n  couple: Couple\n}\n\ntype Query {\n  GetCouple(coupleId: Int!): GetCoupleResponse\n  GetRequestCouple: GetRequestCoupleResponse!\n}\n\ntype GetRequestCoupleResponse {\n  ok: Boolean!\n  error: String\n  couple: Couple\n}\n\ntype RequestCoupleResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  RequestCouple(phoneNumber: String!): RequestCoupleResponse!\n  UpdateCoupleStatus(coupleId: Int!, status: StatusOptions!): UpdateCoupleStatusResponse!\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!): AddPlaceResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(email: String!, password: String!, name: String!): EmailSignUpResponse!\n  FacebookConnect(firstName: String, lastName: String, email: String!, fbId: String!): FacebookConnectResponse!\n  GoogleConnect(firstName: String, lastName: String, email: String!, googleId: String!): GoogleConnectResponse!\n  KakaoConnect(name: String!, email: String!, kakaoId: String!): KakaoConnectResponse!\n  NaverConnect(firstName: String, lastName: String, name: String, email: String!, naverId: String!): NaverConnectResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n}\n\ntype Couple {\n  id: Int!\n  status: String!\n  chat: Chat\n  searchPhoneNumber: String!\n  requestUser: User\n  requestUserId: Int!\n  acceptUser: User\n  acceptUserId: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype UpdateCoupleStatusResponse {\n  ok: Boolean!\n  error: String\n  coupleId: Int\n}\n\nenum StatusOptions {\n  ACCEPTED\n  CANCELED\n  FINISHED\n  REQUESTING\n}\n\ntype EmailVerification {\n  id: Int!\n  target: String!\n  email: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  chatId: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype PhoneVerification {\n  id: Int!\n  target: String!\n  phoneNumber: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String!\n  phoneVerificationUser: User\n  phoneVerificationUserId: Int!\n}\n\ntype AddPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  coupleId: Int!\n  couple: Couple!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GoogleConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype KakaoConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype NaverConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: Int!\n  fbId: String!\n  googleId: String!\n  kakaoId: String!\n  naverId: String!\n  email: String!\n  password: String!\n  signUpEmail: String!\n  verifiedEmail: Boolean!\n  name: String!\n  firstName: String!\n  lastName: String!\n  fullName: String!\n  phoneNumber: String!\n  isRequested: Boolean!\n  isAccepted: Boolean!\n  verifiedPhoneNumber: Boolean!\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetCouple: GetCoupleResponse | null;
  GetRequestCouple: GetRequestCoupleResponse;
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
  status: string;
  chat: Chat | null;
  searchPhoneNumber: string;
  requestUser: User | null;
  requestUserId: number;
  acceptUser: User | null;
  acceptUserId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  couple: Couple;
  requestUserId: number;
  acceptUserId: number;
  requestUserName: string;
  acceptUserName: string;
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
  password: string;
  signUpEmail: string;
  verifiedEmail: boolean;
  name: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  isRequested: boolean;
  isAccepted: boolean;
  verifiedPhoneNumber: boolean;
}

export interface GetRequestCoupleResponse {
  ok: boolean;
  error: string | null;
  couple: Couple | null;
}

export interface Mutation {
  RequestCouple: RequestCoupleResponse;
  UpdateCoupleStatus: UpdateCoupleStatusResponse;
  AddPlace: AddPlaceResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  GoogleConnect: GoogleConnectResponse;
  KakaoConnect: KakaoConnectResponse;
  NaverConnect: NaverConnectResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
}

export interface RequestCoupleMutationArgs {
  phoneNumber: string;
}

export interface UpdateCoupleStatusMutationArgs {
  coupleId: number;
  status: StatusOptions;
}

export interface AddPlaceMutationArgs {
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  email: string;
  password: string;
  name: string;
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
  name: string;
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

export type StatusOptions = "ACCEPTED" | "CANCELED" | "FINISHED" | "REQUESTING";

export interface UpdateCoupleStatusResponse {
  ok: boolean;
  error: string | null;
  coupleId: number | null;
}

export interface AddPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface CompleteEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
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

export interface Subscription {
  CoupleStatusSubscription: Couple | null;
  RequestCoupleSubscription: Couple | null;
}

export interface EmailVerification {
  id: number;
  target: string;
  email: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface PhoneVerification {
  id: number;
  target: string;
  phoneNumber: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  phoneVerificationUser: User | null;
  phoneVerificationUserId: number;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  coupleId: number;
  couple: Couple;
  createdAt: string;
  updatedAt: string;
}
