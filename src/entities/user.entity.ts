import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Address } from "./address.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique: true})
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    name: string

    @Column()
    cnpj_cpf: string

    @Column()
    responsible: string

    @Column()
    contact: string

    @Column()
    type: string

    @Column()
    isAdm: boolean

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address
}