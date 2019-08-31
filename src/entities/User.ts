import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import { IsEmail } from "class-validator";
import Couple from "./Couple";
import PhoneVerification from "./PhoneVerification";
import bcrypt from "bcrypt";
import Chat from "./Chat";
import Message from "./Message";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  signUpEmail: string;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  name: string;

  @Column({ type: "text", nullable: true })
  firstName: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

  @Column({ type: "text", nullable: true, default: "" })
  nickName: string;

  @Column({ type: "text", nullable: true, default: "" })
  profileImage: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhone: boolean;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @Column({ type: "text", nullable: true })
  googleId: string;

  @Column({ type: "text", nullable: true })
  kakaoId: string;

  @Column({ type: "text", nullable: true })
  naverId: string;

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

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
