import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { IsEmail } from "class-validator";
import Couple from "./Couple";
import PhoneVerification from "./PhoneVerification";
import Chat from "./Chat";
import Message from "./Message";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string;

  @Column({ type: "text", nullable: true })
  name: string;

  @Column({ type: "text", nullable: true })
  firstName: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

  @Column({ type: "text", nullable: true, default: "" })
  nickname: string;

  @Column({ type: "text", nullable: true, default: "" })
  profileImage: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhone: boolean;

  @Column({ nullable: true })
  coupleId: number;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @Column({ type: "text", nullable: true })
  googleId: string;

  @Column({ type: "text", nullable: true })
  kakaoId: string;

  @Column({ type: "boolean", default: false })
  isRequested: boolean;

  @Column({ type: "boolean", default: false })
  isAccepted: boolean;

  @Column({ type: "boolean", default: false })
  isCouple: boolean;

  @OneToMany(type => Couple, couple => couple.requestUser)
  couplesAsRequestUser: Couple[];

  @OneToMany(type => Couple, couple => couple.acceptUser)
  couplesAsAcceptUser: Couple[];

  @OneToMany(type => Chat, chat => chat.requestUser)
  chatsAsRequestUser: Chat[];

  @OneToMany(type => Chat, chat => chat.acceptUser)
  chatsAsAcceptUser: Chat[];

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  @OneToMany(
    type => PhoneVerification,
    phoneVerification => phoneVerification.phoneVerificationUser
  )
  couplesAsPhoneVerificationUser: PhoneVerification[];

  get fullName(): string {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    } else if (this.name) {
      return `${this.name}`;
    } else {
      return "undefined";
    }
  }
}

export default User;
