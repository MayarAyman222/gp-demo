-- CreateTable
CREATE TABLE "Icon" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);
