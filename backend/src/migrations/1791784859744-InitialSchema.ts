import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1791784859744 implements MigrationInterface {
    name = 'InitialSchema1791784859744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Ride" ADD "accepted_offer_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Ride" DROP COLUMN "accepted_offer_id"`);
    }

}
