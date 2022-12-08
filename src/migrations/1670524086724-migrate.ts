import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1670524086724 implements MigrationInterface {
    name = 'migrate1670524086724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "word" character varying NOT NULL, "win" boolean NOT NULL, "userId" integer, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }

}
