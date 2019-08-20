import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Chat from "./Chat";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;

  @Column({ nullable: true })
  chatId: number;

  // @ManyToOne(type => Couple, couple => couple.messagesAsRequestUser, {
  //   nullable: true
  // })
  // requestUser: Couple;

  // @Column({ nullable: true })
  // requestUserId: number;

  // @ManyToOne(type => Couple, couple => couple.messagesAsAcceptUser, {
  //   nullable: true
  // })
  // acceptUser: Couple;

  // @Column({ nullable: true })
  // acceptUserId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Message;
