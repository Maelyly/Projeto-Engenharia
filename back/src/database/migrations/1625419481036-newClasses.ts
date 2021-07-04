import {MigrationInterface, QueryRunner} from "typeorm";

export class newClasses1625419481036 implements MigrationInterface {
    name = 'newClasses1625419481036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense" ("id" varchar PRIMARY KEY NOT NULL, "value_expenses_user" double NOT NULL, "value_expenses_family" double NOT NULL, "goal_expenses_user" double NOT NULL, "goal_expenses_famiy" double NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "family" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "familyOwnerId" varchar)`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "date_inclusion" datetime NOT NULL DEFAULT (datetime('now')), "date_modification" datetime NOT NULL DEFAULT (datetime('now')), "price" double NOT NULL, "category" varchar NOT NULL, "expiration_date" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "total_price" double NOT NULL, "idProductId" varchar, "nameId" varchar)`);
        await queryRunner.query(`CREATE TABLE "shoppingItem" ("id" varchar PRIMARY KEY NOT NULL, "value_total_shop" double NOT NULL, "value_total" double NOT NULL, "date_shop" datetime NOT NULL DEFAULT (datetime('now')), "adminId" varchar, "editorId" varchar)`);
        await queryRunner.query(`CREATE TABLE "shoppingList" ("id" varchar PRIMARY KEY NOT NULL, "total_expenses" double NOT NULL, "month" integer NOT NULL, "year" integer NOT NULL, "ownerId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_family" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "familyOwnerId" varchar, CONSTRAINT "FK_3cf2f72948b232a00fb7e08bee6" FOREIGN KEY ("familyOwnerId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_family"("id", "name", "familyOwnerId") SELECT "id", "name", "familyOwnerId" FROM "family"`);
        await queryRunner.query(`DROP TABLE "family"`);
        await queryRunner.query(`ALTER TABLE "temporary_family" RENAME TO "family"`);
        await queryRunner.query(`CREATE TABLE "temporary_items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "total_price" double NOT NULL, "idProductId" varchar, "nameId" varchar, CONSTRAINT "FK_4794db1d1a2f9350ad711541e25" FOREIGN KEY ("idProductId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_57e5d4be6843bec8fdc0c30cc5e" FOREIGN KEY ("nameId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_items"("id", "quant", "data_incl", "total_price", "idProductId", "nameId") SELECT "id", "quant", "data_incl", "total_price", "idProductId", "nameId" FROM "items"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`ALTER TABLE "temporary_items" RENAME TO "items"`);
        await queryRunner.query(`CREATE TABLE "temporary_shoppingItem" ("id" varchar PRIMARY KEY NOT NULL, "value_total_shop" double NOT NULL, "value_total" double NOT NULL, "date_shop" datetime NOT NULL DEFAULT (datetime('now')), "adminId" varchar, "editorId" varchar, CONSTRAINT "FK_2eae71c0702e181466c11fe9b4b" FOREIGN KEY ("adminId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_d3964dfb687a7dd9a3b7c01ea55" FOREIGN KEY ("editorId") REFERENCES "family" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_shoppingItem"("id", "value_total_shop", "value_total", "date_shop", "adminId", "editorId") SELECT "id", "value_total_shop", "value_total", "date_shop", "adminId", "editorId" FROM "shoppingItem"`);
        await queryRunner.query(`DROP TABLE "shoppingItem"`);
        await queryRunner.query(`ALTER TABLE "temporary_shoppingItem" RENAME TO "shoppingItem"`);
        await queryRunner.query(`CREATE TABLE "temporary_shoppingList" ("id" varchar PRIMARY KEY NOT NULL, "total_expenses" double NOT NULL, "month" integer NOT NULL, "year" integer NOT NULL, "ownerId" varchar, CONSTRAINT "FK_3f6d92542e4daaff68a982ee40b" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_shoppingList"("id", "total_expenses", "month", "year", "ownerId") SELECT "id", "total_expenses", "month", "year", "ownerId" FROM "shoppingList"`);
        await queryRunner.query(`DROP TABLE "shoppingList"`);
        await queryRunner.query(`ALTER TABLE "temporary_shoppingList" RENAME TO "shoppingList"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shoppingList" RENAME TO "temporary_shoppingList"`);
        await queryRunner.query(`CREATE TABLE "shoppingList" ("id" varchar PRIMARY KEY NOT NULL, "total_expenses" double NOT NULL, "month" integer NOT NULL, "year" integer NOT NULL, "ownerId" varchar)`);
        await queryRunner.query(`INSERT INTO "shoppingList"("id", "total_expenses", "month", "year", "ownerId") SELECT "id", "total_expenses", "month", "year", "ownerId" FROM "temporary_shoppingList"`);
        await queryRunner.query(`DROP TABLE "temporary_shoppingList"`);
        await queryRunner.query(`ALTER TABLE "shoppingItem" RENAME TO "temporary_shoppingItem"`);
        await queryRunner.query(`CREATE TABLE "shoppingItem" ("id" varchar PRIMARY KEY NOT NULL, "value_total_shop" double NOT NULL, "value_total" double NOT NULL, "date_shop" datetime NOT NULL DEFAULT (datetime('now')), "adminId" varchar, "editorId" varchar)`);
        await queryRunner.query(`INSERT INTO "shoppingItem"("id", "value_total_shop", "value_total", "date_shop", "adminId", "editorId") SELECT "id", "value_total_shop", "value_total", "date_shop", "adminId", "editorId" FROM "temporary_shoppingItem"`);
        await queryRunner.query(`DROP TABLE "temporary_shoppingItem"`);
        await queryRunner.query(`ALTER TABLE "items" RENAME TO "temporary_items"`);
        await queryRunner.query(`CREATE TABLE "items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "total_price" double NOT NULL, "idProductId" varchar, "nameId" varchar)`);
        await queryRunner.query(`INSERT INTO "items"("id", "quant", "data_incl", "total_price", "idProductId", "nameId") SELECT "id", "quant", "data_incl", "total_price", "idProductId", "nameId" FROM "temporary_items"`);
        await queryRunner.query(`DROP TABLE "temporary_items"`);
        await queryRunner.query(`ALTER TABLE "family" RENAME TO "temporary_family"`);
        await queryRunner.query(`CREATE TABLE "family" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "familyOwnerId" varchar)`);
        await queryRunner.query(`INSERT INTO "family"("id", "name", "familyOwnerId") SELECT "id", "name", "familyOwnerId" FROM "temporary_family"`);
        await queryRunner.query(`DROP TABLE "temporary_family"`);
        await queryRunner.query(`DROP TABLE "shoppingList"`);
        await queryRunner.query(`DROP TABLE "shoppingItem"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "family"`);
        await queryRunner.query(`DROP TABLE "expense"`);
    }

}
