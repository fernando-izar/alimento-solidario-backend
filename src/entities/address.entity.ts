import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")

export class Address{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    address: string

    @Column()
    complement: string

    @Column()
    city: string

    @Column({length: 2})
    state: string

    @Column({length: 8})
    zipCode: string
}
