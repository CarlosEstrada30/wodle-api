import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1670524420372 implements MigrationInterface {
    name = 'migrate1670524420372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "count" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "win" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "win" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "count"`);
    }

}
