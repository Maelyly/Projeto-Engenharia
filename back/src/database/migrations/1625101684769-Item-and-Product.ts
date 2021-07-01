import {MigrationInterface, QueryRunner} from "typeorm";

export class ItemAndProduct1625101684769 implements MigrationInterface {
    name = 'ItemAndProduct1625101684769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "date_inclusion" datetime NOT NULL, "date_modification" datetime NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "idProductId" varchar, "nameId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "idProductId" varchar, "nameId" varchar, CONSTRAINT "FK_4794db1d1a2f9350ad711541e25" FOREIGN KEY ("idProductId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_57e5d4be6843bec8fdc0c30cc5e" FOREIGN KEY ("nameId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_items"("id", "quant", "data_incl", "idProductId", "nameId") SELECT "id", "quant", "data_incl", "idProductId", "nameId" FROM "items"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`ALTER TABLE "temporary_items" RENAME TO "items"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" RENAME TO "temporary_items"`);
        await queryRunner.query(`CREATE TABLE "items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "idProductId" varchar, "nameId" varchar)`);
        await queryRunner.query(`INSERT INTO "items"("id", "quant", "data_incl", "idProductId", "nameId") SELECT "id", "quant", "data_incl", "idProductId", "nameId" FROM "temporary_items"`);
        await queryRunner.query(`DROP TABLE "temporary_items"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
