import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import User from "./User";
import Chat from "./Chat";
import Place from "./Place";

@Entity()
class Couple extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", nullable: true })
  status: string;

  @OneToOne(type => Chat, chat => chat.couple, { nullable: true })
  @JoinColumn()
  chat: Chat;

  @Column({ type: "text", nullable: true })
  searchPhoneNumber: string;

  @ManyToOne(type => User, user => user.couplesAsRequestUser)
  requestUser: User;

  @Column({ nullable: true })
  requestUserId: number;

  @ManyToOne(type => User, user => user.couplesAsAcceptUser)
  acceptUser: User;

  @Column({ nullable: true })
  acceptUserId: number;

  @OneToMany(type => Place, place => place.couple)
  places: Place[];

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Couple;
