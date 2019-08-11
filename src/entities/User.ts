import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail } from "class-validator";

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

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;
