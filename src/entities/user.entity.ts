import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Address } from "./address.entity";
import { Donation } from "./donations.entity";
import { Reservation } from "./reservations.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 100 })
  @Exclude()
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 18 })
  @Exclude()
  cnpj_cpf: string;

  @Column({ length: 100 })
  responsible: string;

  @Column({ length: 50 })
  contact: string;

  @Column({ length: 10 })
  type: string;

  @Column()
  isAdm: boolean;

  @OneToOne(() => Address, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Donation, (donation) => donation.user)
  donations: Donation[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @Column({ default: true })
  isActive: boolean;
}
