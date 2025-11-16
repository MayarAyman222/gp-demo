/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Icon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Icon" DROP COLUMN "imageUrl",
ALTER COLUMN "iconName" DROP DEFAULT;
