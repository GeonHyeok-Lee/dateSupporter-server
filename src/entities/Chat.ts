import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  OneToOne,
  ManyToOne
} from "typeorm";
import Message from "./Message";
import Couple from "./Couple";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany(type => Message, message => message.chat, { nullable: true })
  messages: Message[];

  @OneToOne(type => Couple, couple => couple.chat, { nullable: true })
  couple: Couple;

  @Column({ nullable: true })
  coupleId: number;

  @ManyToOne(type => User, user => user.chatsAsRequestUser, {
    nullable: true
  })
  requestUser: User;

  @Column({ nullable: true })
  requestUserId: number;

  @ManyToOne(type => User, user => user.chatsAsAcceptUser, { nullable: true })
  acceptUser: User;

  @Column({ nullable: true })
  acceptUserId: number;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Chat;
