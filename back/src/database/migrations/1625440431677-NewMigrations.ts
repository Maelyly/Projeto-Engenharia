import {MigrationInterface, QueryRunner} from "typeorm";

export class NewMigrations1625440431677 implements MigrationInterface {
    name = 'NewMigrations1625440431677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense" ("id" varchar PRIMARY KEY NOT NULL, "value_expenses_user" double NOT NULL, "value_expenses_family" double NOT NULL, "goal_expenses_user" double NOT NULL, "goal_expenses_famiy" double NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "shoppingList" ("id" varchar PRIMARY KEY NOT NULL, "total_expenses" double NOT NULL, "month" integer NOT NULL, "year" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "shoppingItem" ("id" varchar PRIMARY KEY NOT NULL, "value_total_shop" double NOT NULL, "value_total" double NOT NULL, "date_shop" datetime NOT NULL DEFAULT (datetime('now')), "editor" boolean NOT NULL, "adminId" varchar, "shoppinglistId" varchar)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "passwordHash" varchar NOT NULL, "name" varchar NOT NULL, "user_name" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "familyId" varchar)`);
        await queryRunner.query(`CREATE TABLE "family" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "date_inclusion" datetime NOT NULL DEFAULT (datetime('now')), "date_modification" datetime NOT NULL DEFAULT (datetime('now')), "price" double NOT NULL, "category" varchar NOT NULL, "expiration_date" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "total_price" double NOT NULL, "productsId" varchar)`);
        await queryRunner.query(`CREATE TABLE "promotion" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "min_num" integer NOT NULL, "promo_perc" double NOT NULL, "adminId" varchar, CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "temporary_shoppingItem" ("id" varchar PRIMARY KEY NOT NULL, "value_total_shop" double NOT NULL, "value_total" double NOT NULL, "date_shop" datetime NOT NULL DEFAULT (datetime('now')), "editor" boolean NOT NULL, "adminId" varchar, "shoppinglistId" varchar, CONSTRAINT "FK_2eae71c0702e181466c11fe9b4b" FOREIGN KEY ("adminId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a29bfe749922730b464a0826d7d" FOREIGN KEY ("shoppinglistId") REFERENCES "shoppingList" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_shoppingItem"("id", "value_total_shop", "value_total", "date_shop", "editor", "adminId", "shoppinglistId") SELECT "id", "value_total_shop", "value_total", "date_shop", "editor", "adminId", "shoppinglistId" FROM "shoppingItem"`);
        await queryRunner.query(`DROP TABLE "shoppingItem"`);
        await queryRunner.query(`ALTER TABLE "temporary_shoppingItem" RENAME TO "shoppingItem"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "passwordHash" varchar NOT NULL, "name" varchar NOT NULL, "user_name" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "familyId" varchar, CONSTRAINT "FK_fe061246f26eb287a16b0fa300d" FOREIGN KEY ("familyId") REFERENCES "family" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "passwordHash", "name", "user_name", "createdAt", "familyId") SELECT "id", "email", "passwordHash", "name", "user_name", "createdAt", "familyId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "total_price" double NOT NULL, "productsId" varchar, CONSTRAINT "FK_4013b1d959e37ce27803cd6a3bb" FOREIGN KEY ("productsId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_items"("id", "quant", "data_incl", "total_price", "productsId") SELECT "id", "quant", "data_incl", "total_price", "productsId" FROM "items"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`ALTER TABLE "temporary_items" RENAME TO "items"`);
        await queryRunner.query(`CREATE TABLE "temporary_promotion" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "min_num" integer NOT NULL, "promo_perc" double NOT NULL, "adminId" varchar, CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"), CONSTRAINT "FK_61f8e2223c5dc6d5818ac54d2f4" FOREIGN KEY ("adminId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_promotion"("id", "name", "min_num", "promo_perc", "adminId") SELECT "id", "name", "min_num", "promo_perc", "adminId" FROM "promotion"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
        await queryRunner.query(`ALTER TABLE "temporary_promotion" RENAME TO "promotion"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promotion" RENAME TO "temporary_promotion"`);
        await queryRunner.query(`CREATE TABLE "promotion" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "min_num" integer NOT NULL, "promo_perc" double NOT NULL, "adminId" varchar, CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "promotion"("id", "name", "min_num", "promo_perc", "adminId") SELECT "id", "name", "min_num", "promo_perc", "adminId" FROM "temporary_promotion"`);
        await queryRunner.query(`DROP TABLE "temporary_promotion"`);
        await queryRunner.query(`ALTER TABLE "items" RENAME TO "temporary_items"`);
        await queryRunner.query(`CREATE TABLE "items" ("id" varchar PRIMARY KEY NOT NULL, "quant" integer NOT NULL, "data_incl" datetime NOT NULL DEFAULT (datetime('now')), "total_price" double NOT NULL, "productsId" varchar)`);
        await queryRunner.query(`INSERT INTO "items"("id", "quant", "data_incl", "total_price", "productsId") SELECT "id", "quant", "data_incl", "total_price", "productsId" FROM "temporary_items"`);
        await queryRunner.query(`DROP TABLE "temporary_items"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "passwordHash" varchar NOT NULL, "name" varchar NOT NULL, "user_name" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "familyId" varchar)`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "passwordHash", "name", "user_name", "createdAt", "familyId") SELECT "id", "email", "passwordHash", "name", "user_name", "createdAt", "familyId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "shoppingItem" RENAME TO "temporary_shoppingItem"`);
        await queryRunner.query(`CREATE TABLE "shoppingItem" ("id" varchar PRIMARY KEY NOT NULL, "value_total_shop" double NOT NULL, "value_total" double NOT NULL, "date_shop" datetime NOT NULL DEFAULT (datetime('now')), "editor" boolean NOT NULL, "adminId" varchar, "shoppinglistId" varchar)`);
        await queryRunner.query(`INSERT INTO "shoppingItem"("id", "value_total_shop", "value_total", "date_shop", "editor", "adminId", "shoppinglistId") SELECT "id", "value_total_shop", "value_total", "date_shop", "editor", "adminId", "shoppinglistId" FROM "temporary_shoppingItem"`);
        await queryRunner.query(`DROP TABLE "temporary_shoppingItem"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "family"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "shoppingItem"`);
        await queryRunner.query(`DROP TABLE "shoppingList"`);
        await queryRunner.query(`DROP TABLE "expense"`);
    }

}
