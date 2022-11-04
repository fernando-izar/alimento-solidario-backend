import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Donation } from "./donations.entity";
import { User } from "./user.entity";

@Entity("reservations")
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Donation)
  @JoinColumn()
  donation: string;

  @ManyToOne(() => User)
  user: User;
}
