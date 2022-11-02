import { MigrationInterface, QueryRunner } from "typeorm";

export class alterateTableClassifications1667355974133 implements MigrationInterface {
    name = 'alterateTableClassifications1667355974133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "complement"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "complement" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classifications" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "classifications" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classifications" ADD CONSTRAINT "UQ_31d1321f8e4d8e0f7e44b04844e" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classifications" DROP CONSTRAINT "UQ_31d1321f8e4d8e0f7e44b04844e"`);
        await queryRunner.query(`ALTER TABLE "classifications" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "classifications" ADD "name" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "city" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "complement"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "complement" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "address" character varying(100) NOT NULL`);
    }

}
