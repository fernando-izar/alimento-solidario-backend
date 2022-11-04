import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Classification } from "./classifications.entity";
import { User } from "./user.entity";

@Entity("donations")
export class Donation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  food: string;

  @Column({ length: 30 })
  quantity: string;

  @Column()
  expiration: Date;

  @Column({ default: true })
  available: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Classification, {
    eager: true,
  })
  classification: Classification;

  @ManyToOne(() => User)
  user: User;
}
