import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667321540966 implements MigrationInterface {
    name = 'createTables1667321540966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying(100) NOT NULL, "complement" character varying(50), "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, "zipcode" character varying(8) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "donationId" uuid, "userId" uuid, CONSTRAINT "REL_36bf36c34812a0377b9e3dd111" UNIQUE ("donationId"), CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "name" character varying(100) NOT NULL, "cnpj_cpf" character varying(18) NOT NULL, "responsible" character varying(100) NOT NULL, "contact" character varying(50) NOT NULL, "type" character varying(10) NOT NULL, "isAdm" boolean NOT NULL, "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fcc0365599821be96254c7f6f44" UNIQUE ("cnpj_cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "donations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "food" character varying(50) NOT NULL, "quantity" character varying(30) NOT NULL, "expiration" TIMESTAMP NOT NULL, "available" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "classificationId" uuid, "userId" uuid, CONSTRAINT "PK_c01355d6f6f50fc6d1b4a946abf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(10) NOT NULL, CONSTRAINT "PK_58d976e264f75fc0ea006718856" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_36bf36c34812a0377b9e3dd1116" FOREIGN KEY ("donationId") REFERENCES "donations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donations" ADD CONSTRAINT "FK_e2caaaad200fba05850ac629c6a" FOREIGN KEY ("classificationId") REFERENCES "classifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donations" ADD CONSTRAINT "FK_cfd5edc39019b9001bd86e90f77" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donations" DROP CONSTRAINT "FK_cfd5edc39019b9001bd86e90f77"`);
        await queryRunner.query(`ALTER TABLE "donations" DROP CONSTRAINT "FK_e2caaaad200fba05850ac629c6a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_36bf36c34812a0377b9e3dd1116"`);
        await queryRunner.query(`DROP TABLE "classifications"`);
        await queryRunner.query(`DROP TABLE "donations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
