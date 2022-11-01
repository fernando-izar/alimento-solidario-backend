import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 50, nullable: true })
  complement: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 8 })
  zipcode: string;
}
