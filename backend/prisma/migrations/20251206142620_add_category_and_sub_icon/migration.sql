/*
  Warnings:

  - Added the required column `category` to the `Icon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Icon" ADD COLUMN     "category" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SubIcon" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "iconId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubIcon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubIcon_title_iconId_key" ON "SubIcon"("title", "iconId");

-- AddForeignKey
ALTER TABLE "SubIcon" ADD CONSTRAINT "SubIcon_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
