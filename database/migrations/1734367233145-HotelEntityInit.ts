import { MigrationInterface, QueryRunner } from "typeorm";

export class HotelEntityInit1734367233145 implements MigrationInterface {
    name = 'HotelEntityInit1734367233145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hotel" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_3a62ac86b369b36c1a297e9ab26" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hotel"`);
    }

}
