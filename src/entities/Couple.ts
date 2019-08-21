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

  @OneToOne(type => User, user => user.couplesAsAcceptUser, { nullable: true })
  @JoinColumn()
  acceptUser: User;

  @Column({ type: "text" })
  requestedPhoneNumber: string;

  @Column({ type: "text" })
  acceptedPhoneNumber: string;

  @OneToMany(type => Place, place => place.couple, { nullable: true })
  places: Place[];

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Couple;
