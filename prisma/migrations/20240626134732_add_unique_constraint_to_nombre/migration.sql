/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Realm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Realm_nombre_key` ON `Realm`(`nombre`);
