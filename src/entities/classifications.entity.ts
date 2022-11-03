import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Donation } from "./donations.entity";

@Entity("classifications")
export class Classification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @OneToMany(() => Donation, (donation) => donation.classification)
  donations: Donation[];
}
