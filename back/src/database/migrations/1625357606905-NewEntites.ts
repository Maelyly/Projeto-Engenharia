import {MigrationInterface, QueryRunner} from "typeorm";

export class NewEntites1625357606905 implements MigrationInterface {
    name = 'NewEntites1625357606905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense" ("id" varchar PRIMARY KEY NOT NULL, "valor_gasto_usuario" double NOT NULL, "valor_gasto_familiar" double NOT NULL, "meta_gastos_usuario" datetime NOT NULL, "meta_gastos_familiar" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "family" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "date_inclusion" datetime NOT NULL DEFAULT (datetime('now')), "date_modification" datetime NOT NULL DEFAULT (datetime('now')), "price" double NOT NULL, "category" varchar NOT NULL, "expiration_date" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "total_price" double NOT NULL, "idProductId" varchar, "nameId" varchar)`);
        await queryRunner.query(`CREATE TABLE "shoppingItem" ("id" varchar PRIMARY KEY NOT NULL, "valor_total_compra" double NOT NULL, "valor_total" double NOT NULL, "date_compra" datetime NOT NULL, "admin" varchar NOT NULL, "editores" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "shoppingList" ("id" varchar PRIMARY KEY NOT NULL, "total_de_gastos" double NOT NULL, "dono" varchar NOT NULL, "mes" integer NOT NULL, "ano" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "total_price" double NOT NULL, "idProductId" varchar, "nameId" varchar, CONSTRAINT "FK_4794db1d1a2f9350ad711541e25" FOREIGN KEY ("idProductId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_57e5d4be6843bec8fdc0c30cc5e" FOREIGN KEY ("nameId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_items"("id", "quant", "data_incl", "total_price", "idProductId", "nameId") SELECT "id", "quant", "data_incl", "total_price", "idProductId", "nameId" FROM "items"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`ALTER TABLE "temporary_items" RENAME TO "items"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" RENAME TO "temporary_items"`);
        await queryRunner.query(`CREATE TABLE "items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "total_price" double NOT NULL, "idProductId" varchar, "nameId" varchar)`);
        await queryRunner.query(`INSERT INTO "items"("id", "quant", "data_incl", "total_price", "idProductId", "nameId") SELECT "id", "quant", "data_incl", "total_price", "idProductId", "nameId" FROM "temporary_items"`);
        await queryRunner.query(`DROP TABLE "temporary_items"`);
        await queryRunner.query(`DROP TABLE "shoppingList"`);
        await queryRunner.query(`DROP TABLE "shoppingItem"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "family"`);
        await queryRunner.query(`DROP TABLE "expense"`);
    }

}
