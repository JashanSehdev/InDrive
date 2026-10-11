import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1791656500734 implements MigrationInterface {
    name = 'InitialSchema1791656500734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Ride" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Ride" DROP COLUMN "price"`);
    }

}
