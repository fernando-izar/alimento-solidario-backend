import {
  CreateDateColumn,
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

  @CreateDateColumn()
  date: Date;

  @OneToOne(() => Donation)
  @JoinColumn()
  donation: Donation;

  @ManyToOne(() => User)
  user: User;
}
