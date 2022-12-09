import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1670543502340 implements MigrationInterface {
    name = 'migrate1670543502340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_word" ("id" SERIAL NOT NULL, "word" character varying NOT NULL, "record" integer NOT NULL, "gameId" integer NOT NULL, CONSTRAINT "PK_a48686e127cc64975c587776c5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54"`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_word" ADD CONSTRAINT "FK_91d1500604b4b24c9dd3a1ea0f0" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_word" DROP CONSTRAINT "FK_91d1500604b4b24c9dd3a1ea0f0"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54"`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "user_word"`);
    }

}
