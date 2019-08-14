import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Column,
  OneToOne
} from "typeorm";
import Message from "./Message";
import User from "./User";
import Couple from "./Couple";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToOne(type => Couple, couple => couple.chat)
  couple: Couple;

  @OneToMany(type => Message, message => message.chat, { nullable: true })
  messages: Message[];

  @ManyToOne(type => User, user => user.chatsAsProposedUser)
  proposedUser: User;

  @Column({ nullable: true })
  proposedUserId: number;

  @ManyToOne(type => User, user => user.chatsAsAcceptedUser)
  acceptedUser: User;

  @Column({ nullable: true })
  acceptedUserId: number;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Chat;
