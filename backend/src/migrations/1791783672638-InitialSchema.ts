import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1791783672638 implements MigrationInterface {
    name = 'InitialSchema1791783672638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_1cb15f22a204f6e9feccaaf20cf"`);
        await queryRunner.query(`ALTER TABLE "Ride" ADD "acceptedOfferId" integer`);
        await queryRunner.query(`ALTER TABLE "Ride" ADD CONSTRAINT "UQ_8509a5f9258fe7b1292f39c9ad2" UNIQUE ("acceptedOfferId")`);
        await queryRunner.query(`ALTER TABLE "Ride" ADD CONSTRAINT "FK_8509a5f9258fe7b1292f39c9ad2" FOREIGN KEY ("acceptedOfferId") REFERENCES "offer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_1cb15f22a204f6e9feccaaf20cf" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_1cb15f22a204f6e9feccaaf20cf"`);
        await queryRunner.query(`ALTER TABLE "Ride" DROP CONSTRAINT "FK_8509a5f9258fe7b1292f39c9ad2"`);
        await queryRunner.query(`ALTER TABLE "Ride" DROP CONSTRAINT "UQ_8509a5f9258fe7b1292f39c9ad2"`);
        await queryRunner.query(`ALTER TABLE "Ride" DROP COLUMN "acceptedOfferId"`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_1cb15f22a204f6e9feccaaf20cf" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
