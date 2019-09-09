export const typeDefs = ["type GetChatResponse {\n  ok: Boolean!\n  error: String\n  chat: Chat\n}\n\ntype Query {\n  GetChat(chatId: Int!): GetChatResponse!\n  GetCouple(coupleId: Int!): GetCoupleResponse!\n  GetRequestCouple: GetRequestCoupleResponse!\n  GetPlace(coupleId: Int!): GetPlaceResponse\n  GetUser: GetUserResponse!\n  GetCoupleIdFromUser: GetUserResponse!\n}\n\ntype Subscription {\n  MessageSubscription: Message\n  CoupleStatusSubscription: Couple\n  RequestCoupleSubscription: Couple\n}\n\ntype SendMessageResponse {\n  ok: Boolean!\n  error: String\n  message: Message\n}\n\ntype Mutation {\n  SendMessage(text: String!, chatId: Int!): SendMessageResponse!\n  RequestCouple(phoneNumber: String!): RequestCoupleResponse!\n  UpdateCoupleStatus(coupleId: Int!, status: StatusOptions!): UpdateCoupleStatusResponse!\n  AddPlace(coupleId: Int!, name: String!, contents: String!, lat: Float!, lng: Float!, address: String!): AddPlaceResponse!\n  DeletePlace(coupleId: Int!, placeId: Int!): DeletePlaceResponse!\n  EditPlace(coupleId: Int!, placeId: Int!, name: String!, contents: String!): EditPlaceResponse!\n  ResetUser: ResetUserResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EditUser(nickname: String!, profileImage: String!): EditUserResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(email: String!, password: String!, name: String!): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String!, fbId: String!): FacebookConnectResponse!\n  GoogleConnect(firstName: String!, lastName: String!, email: String!, googleId: String!, profileImage: String!): GoogleConnectResponse!\n  KakaoConnect(name: String!, nickname: String!, email: String!, kakaoId: String!, profileImage: String!): KakaoConnectResponse!\n  NaverConnect(name: String!, firstName: String!, lastName: String!, email: String!, naverId: String!): NaverConnectResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n}\n\ntype Chat {\n  id: Int!\n  messages: [Message]\n  couple: Couple\n  coupleId: Int!\n  acceptUser: User\n  acceptUserId: Int!\n  requestUser: User\n  requestUserId: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat\n  chatId: Int!\n  user: User\n  userId: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype GetCoupleResponse {\n  ok: Boolean!\n  error: String\n  couple: Couple\n}\n\ntype GetRequestCoupleResponse {\n  ok: Boolean!\n  error: String\n  couple: Couple\n}\n\ntype RequestCoupleResponse {\n  ok: Boolean!\n  error: String\n  couple: Couple\n}\n\ntype Couple {\n  id: Int!\n  status: String!\n  chat: Chat\n  chatId: Int!\n  requestUser: User\n  requestUserId: Int!\n  acceptUser: User\n  acceptUserId: Int!\n  requestPhoneNumber: String!\n  acceptPhoneNumber: String!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype UpdateCoupleStatusResponse {\n  ok: Boolean!\n  error: String\n  couple: Couple\n}\n\nenum StatusOptions {\n  ACCEPTED\n  CANCELED\n  FINISHED\n  REQUESTING\n}\n\ntype EmailVerification {\n  id: Int!\n  target: String!\n  email: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype PhoneVerification {\n  id: Int!\n  target: String!\n  phoneNumber: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String!\n  phoneVerificationUser: User\n  phoneVerificationUserId: Int!\n}\n\ntype AddPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeletePlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetPlaceResponse {\n  ok: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  contents: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  couple: Couple!\n  coupleId: Int!\n  addUserId: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype ResetUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GoogleConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype KakaoConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype NaverConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: Int!\n  coupleId: Int!\n  fbId: String!\n  googleId: String!\n  kakaoId: String!\n  naverId: String!\n  email: String!\n  password: String!\n  signUpEmail: String!\n  verifiedEmail: Boolean!\n  name: String!\n  firstName: String!\n  lastName: String!\n  fullName: String!\n  nickname: String!\n  profileImage: String!\n  phoneNumber: String!\n  isRequested: Boolean!\n  isAccepted: Boolean!\n  isCouple: Boolean!\n  verifiedPhone: Boolean!\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetChat: GetChatResponse;
  GetCouple: GetCoupleResponse;
  GetRequestCouple: GetRequestCoupleResponse;
  GetPlace: GetPlaceResponse | null;
  GetUser: GetUserResponse;
  GetCoupleIdFromUser: GetUserResponse;
}

export interface GetChatQueryArgs {
  chatId: number;
}

export interface GetCoupleQueryArgs {
  coupleId: number;
}

export interface GetPlaceQueryArgs {
  coupleId: number;
}

export interface GetChatResponse {
  ok: boolean;
  error: string | null;
  chat: Chat | null;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  couple: Couple | null;
  coupleId: number;
  acceptUser: User | null;
  acceptUserId: number;
  requestUser: User | null;
  requestUserId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat | null;
  chatId: number;
  user: User | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  coupleId: number;
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
  nickname: string;
  profileImage: string;
  phoneNumber: string;
  isRequested: boolean;
  isAccepted: boolean;
  isCouple: boolean;
  verifiedPhone: boolean;
}

export interface Couple {
  id: number;
  status: string;
  chat: Chat | null;
  chatId: number;
  requestUser: User | null;
  requestUserId: number;
  acceptUser: User | null;
  acceptUserId: number;
  requestPhoneNumber: string;
  acceptPhoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCoupleResponse {
  ok: boolean;
  error: string | null;
  couple: Couple | null;
}

export interface GetRequestCoupleResponse {
  ok: boolean;
  error: string | null;
  couple: Couple | null;
}

export interface GetPlaceResponse {
  ok: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface Place {
  id: number;
  name: string;
  contents: string;
  lat: number;
  lng: number;
  address: string;
  couple: Couple;
  coupleId: number;
  addUserId: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  SendMessage: SendMessageResponse;
  RequestCouple: RequestCoupleResponse;
  UpdateCoupleStatus: UpdateCoupleStatusResponse;
  AddPlace: AddPlaceResponse;
  DeletePlace: DeletePlaceResponse;
  EditPlace: EditPlaceResponse;
  ResetUser: ResetUserResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EditUser: EditUserResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  GoogleConnect: GoogleConnectResponse;
  KakaoConnect: KakaoConnectResponse;
  NaverConnect: NaverConnectResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
}

export interface SendMessageMutationArgs {
  text: string;
  chatId: number;
}

export interface RequestCoupleMutationArgs {
  phoneNumber: string;
}

export interface UpdateCoupleStatusMutationArgs {
  coupleId: number;
  status: StatusOptions;
}

export interface AddPlaceMutationArgs {
  coupleId: number;
  name: string;
  contents: string;
  lat: number;
  lng: number;
  address: string;
}

export interface DeletePlaceMutationArgs {
  coupleId: number;
  placeId: number;
}

export interface EditPlaceMutationArgs {
  coupleId: number;
  placeId: number;
  name: string;
  contents: string;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EditUserMutationArgs {
  nickname: string;
  profileImage: string;
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
  firstName: string;
  lastName: string;
  email: string;
  fbId: string;
}

export interface GoogleConnectMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  googleId: string;
  profileImage: string;
}

export interface KakaoConnectMutationArgs {
  name: string;
  nickname: string;
  email: string;
  kakaoId: string;
  profileImage: string;
}

export interface NaverConnectMutationArgs {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  naverId: string;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface SendMessageResponse {
  ok: boolean;
  error: string | null;
  message: Message | null;
}

export interface RequestCoupleResponse {
  ok: boolean;
  error: string | null;
  couple: Couple | null;
}

export type StatusOptions = "ACCEPTED" | "CANCELED" | "FINISHED" | "REQUESTING";

export interface UpdateCoupleStatusResponse {
  ok: boolean;
  error: string | null;
  couple: Couple | null;
}

export interface AddPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface DeletePlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface EditPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface ResetUserResponse {
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

export interface EditUserResponse {
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
  MessageSubscription: Message | null;
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
