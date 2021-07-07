import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigrations1625546140254 implements MigrationInterface {
    name = 'newMigrations1625546140254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_promotion" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "min_num" integer NOT NULL, "promo_perc" double NOT NULL, "adminId" varchar, CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_promotion"("id", "name", "min_num", "promo_perc", "adminId") SELECT "id", "name", "min_num", "promo_perc", "adminId" FROM "promotion"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
        await queryRunner.query(`ALTER TABLE "temporary_promotion" RENAME TO "promotion"`);
        await queryRunner.query(`CREATE TABLE "temporary_promotion" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "min_num" integer NOT NULL, "promo_perc" double NOT NULL, "prodId" varchar, CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_promotion"("id", "name", "min_num", "promo_perc", "prodId") SELECT "id", "name", "min_num", "promo_perc", "adminId" FROM "promotion"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
        await queryRunner.query(`ALTER TABLE "temporary_promotion" RENAME TO "promotion"`);
        await queryRunner.query(`CREATE TABLE "temporary_promotion" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "min_num" integer NOT NULL, "promo_perc" double NOT NULL, "prodId" varchar, CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"), CONSTRAINT "FK_be265bb469d6df61fe4cb9bbf89" FOREIGN KEY ("prodId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_promotion"("id", "name", "min_num", "promo_perc", "prodId") SELECT "id", "name", "min_num", "promo_perc", "prodId" FROM "promotion"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
        await queryRunner.query(`ALTER TABLE "temporary_promotion" RENAME TO "promotion"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promotion" RENAME TO "temporary_promotion"`);
        await queryRunner.query(`CREATE TABLE "promotion" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "min_num" integer NOT NULL, "promo_perc" double NOT NULL, "prodId" varchar, CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "promotion"("id", "name", "min_num", "promo_perc", "prodId") SELECT "id", "name", "min_num", "promo_perc", "prodId" FROM "temporary_promotion"`);
        await queryRunner.query(`DROP TABLE "temporary_promotion"`);
        await queryRunner.query(`ALTER TABLE "promotion" RENAME TO "temporary_promotion"`);
        await queryRunner.query(`CREATE TABLE "promotion" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "min_num" integer NOT NULL, "promo_perc" double NOT NULL, "adminId" varchar, CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "promotion"("id", "name", "min_num", "promo_perc", "adminId") SELECT "id", "name", "min_num", "promo_perc", "prodId" FROM "temporary_promotion"`);
        await queryRunner.query(`DROP TABLE "temporary_promotion"`);
        await queryRunner.query(`ALTER TABLE "promotion" RENAME TO "temporary_promotion"`);
        await queryRunner.query(`CREATE TABLE "promotion" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "min_num" integer NOT NULL, "promo_perc" double NOT NULL, "adminId" varchar, CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"), CONSTRAINT "FK_61f8e2223c5dc6d5818ac54d2f4" FOREIGN KEY ("adminId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "promotion"("id", "name", "min_num", "promo_perc", "adminId") SELECT "id", "name", "min_num", "promo_perc", "adminId" FROM "temporary_promotion"`);
        await queryRunner.query(`DROP TABLE "temporary_promotion"`);
    }

}
