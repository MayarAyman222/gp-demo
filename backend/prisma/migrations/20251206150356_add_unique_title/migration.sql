/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Icon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Icon_title_key" ON "Icon"("title");
