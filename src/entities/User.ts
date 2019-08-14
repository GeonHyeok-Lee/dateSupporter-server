import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { IsEmail } from "class-validator";
import Chat from "./Chat";
import Message from "./Message";
import Couple from "./Couple";
import Verification from "./Verification";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @IsEmail()
  email: string | null;

  @Column({ type: "text", nullable: true })
  name: string | null;

  @Column({ type: "text", nullable: true })
  firstName: string | null;

  @Column({ type: "text", nullable: true })
  lastName: string | null;

  @Column({ type: "text", nullable: true })
  phoneNumber: string | null;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text", nullable: true })
  fbId: string | null;

  @Column({ type: "text", nullable: true })
  googleId: string | null;

  @Column({ type: "text", nullable: true })
  kakaoId: string | null;

  @Column({ type: "text", nullable: true })
  naverId: string | null;

  @Column({ type: "boolean", default: false })
  isProposed: boolean;

  @Column({ type: "boolean", default: false })
  isAccepted: boolean;

  @OneToMany(type => Chat, chat => chat.proposedUser)
  chatsAsProposedUser: Chat[];

  @OneToMany(type => Chat, chat => chat.acceptedUser)
  chatsAsAcceptedUser: Chat[];

  @OneToMany(type => Couple, couple => couple.proposedUser)
  couplesAsProposedUser: Couple[];

  @OneToMany(type => Couple, couple => couple.acceptedUser)
  couplesAsAcceptedUser: Couple[];

  @OneToMany(
    type => Verification,
    verification => verification.verificationUser
  )
  couplesAsVerificationUser: Couple[];

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;
