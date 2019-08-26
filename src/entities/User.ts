import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  OneToOne
} from "typeorm";
import { IsEmail } from "class-validator";
import Couple from "./Couple";
import PhoneVerification from "./PhoneVerification";
import bcrypt from "bcrypt";

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
  name: string | null;

  @Column({ type: "text", nullable: true })
  firstName: string | null;

  @Column({ type: "text", nullable: true })
  lastName: string | null;

  @Column({ type: "text", nullable: true })
  nickName: string;

  @Column({ type: "text", nullable: true })
  profileImage: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

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
  isRequested: boolean;

  @Column({ type: "boolean", default: false })
  isAccepted: boolean;

  @OneToOne(type => Couple, couple => couple.requestUser)
  couplesAsRequestUser: Couple;

  @OneToOne(type => Couple, couple => couple.acceptUser)
  couplesAsAcceptUser: Couple;

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
