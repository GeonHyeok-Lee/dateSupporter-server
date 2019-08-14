import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import User from "./User";
import Chat from "./Chat";

@Entity()
class Couple extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToOne(type => Chat, chat => chat.couple, { nullable: true })
  @JoinColumn()
  chat: Chat;

  @ManyToOne(type => User, user => user.couplesAsProposedUser)
  proposedUser: User;

  @Column({ nullable: true })
  proposedUserId: number;

  @ManyToOne(type => User, user => user.couplesAsAcceptedUser)
  acceptedUser: User;

  @Column({ nullable: true })
  acceptedUserId: number;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Couple;
