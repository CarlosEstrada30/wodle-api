import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1670636091260 implements MigrationInterface {
    name = 'migrate1670636091260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" RENAME COLUMN "word" TO "wordId"`);
        await queryRunner.query(`CREATE TABLE "word" ("id" SERIAL NOT NULL, "word" character varying NOT NULL, CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_word" DROP COLUMN "record"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "wordId"`);
        await queryRunner.query(`ALTER TABLE "game" ADD "wordId" integer`);
        await queryRunner.query(`ALTER TABLE "user_word" DROP CONSTRAINT "FK_91d1500604b4b24c9dd3a1ea0f0"`);
        await queryRunner.query(`ALTER TABLE "user_word" ALTER COLUMN "gameId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_89ce885a041fc1a7e54b19982f3" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_word" ADD CONSTRAINT "FK_91d1500604b4b24c9dd3a1ea0f0" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_word" DROP CONSTRAINT "FK_91d1500604b4b24c9dd3a1ea0f0"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_89ce885a041fc1a7e54b19982f3"`);
        await queryRunner.query(`ALTER TABLE "user_word" ALTER COLUMN "gameId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_word" ADD CONSTRAINT "FK_91d1500604b4b24c9dd3a1ea0f0" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "wordId"`);
        await queryRunner.query(`ALTER TABLE "game" ADD "wordId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_word" ADD "record" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "word"`);
        await queryRunner.query(`ALTER TABLE "game" RENAME COLUMN "wordId" TO "word"`);
    }

}
