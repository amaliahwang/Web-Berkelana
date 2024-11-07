/*
  Warnings:

  - You are about to drop the `CategoryBlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CategoryBlog";

-- CreateTable
CREATE TABLE "CategoryDestination" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,

    CONSTRAINT "CategoryDestination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "hasTourGuide" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GaleryDestination" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "destinationId" INTEGER NOT NULL,

    CONSTRAINT "GaleryDestination_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryDestination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GaleryDestination" ADD CONSTRAINT "GaleryDestination_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
