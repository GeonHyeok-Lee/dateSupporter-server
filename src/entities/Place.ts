import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import Couple from "./Couple";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", nullable: true })
  name: string;

  @Column({ type: "text", nullable: true })
  contents: string;

  @Column({ type: "double precision", default: 0, nullable: true })
  lat: number;

  @Column({ type: "double precision", default: 0, nullable: true })
  lng: number;

  @Column({ type: "text", nullable: true })
  address: string;

  @ManyToOne(type => Couple, couple => couple.places, { nullable: true })
  couple: Couple;

  @Column({ nullable: true })
  coupleId: number;

  @Column({ nullable: true })
  addUserId: number;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Place;
