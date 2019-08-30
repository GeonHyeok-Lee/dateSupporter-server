import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import User from "./User";
import Chat from "./Chat";
import Place from "./Place";
import { CoupleStatus } from "@src/types/types";

@Entity()
class Couple extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({
    type: "enum",
    enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING"],
    default: "REQUESTING"
  })
  status: CoupleStatus;

  @OneToOne(type => Chat, chat => chat.couple, { nullable: true })
  chat: Chat;

  @OneToOne(type => User, user => user.couplesAsRequestUser, { nullable: true })
  @JoinColumn()
  requestUser: User;

  @Column({ nullable: true })
  requestUserId: number;

  @OneToOne(type => User, user => user.couplesAsAcceptUser, { nullable: true })
  @JoinColumn()
  acceptUser: User;

  @Column({ nullable: true })
  acceptUserId: number;

  @Column({ type: "text", nullable: true })
  requestPhoneNumber: string;

  @Column({ type: "text", nullable: true })
  acceptPhoneNumber: string;

  @OneToMany(type => Place, place => place.couple, { nullable: true })
  places: Place[];

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Couple;
