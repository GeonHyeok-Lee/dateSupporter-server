import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import Message from "./Message";
import Couple from "./Couple";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany(type => Message, message => message.chat, { nullable: true })
  messages: Message[];

  @OneToOne(type => Couple, couple => couple.chat)
  @JoinColumn()
  couple: Couple;

  @Column({ nullable: true })
  requestUserId: number;

  @Column({ nullable: true })
  acceptUserId: number;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Chat;
