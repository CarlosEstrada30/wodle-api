import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1670623427612 implements MigrationInterface {
    name = 'migrate1670623427612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "token" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
    }

}
