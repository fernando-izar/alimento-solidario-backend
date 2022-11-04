import { MigrationInterface, QueryRunner } from "typeorm";

export class fixReservationEntity1667579200419 implements MigrationInterface {
    name = 'fixReservationEntity1667579200419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "donations" DROP COLUMN "expiration"`);
        await queryRunner.query(`ALTER TABLE "donations" ADD "expiration" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donations" DROP COLUMN "expiration"`);
        await queryRunner.query(`ALTER TABLE "donations" ADD "expiration" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "date"`);
    }

}
