/*
  Warnings:

  - You are about to drop the column `hasTourGuide` on the `Destination` table. All the data in the column will be lost.
  - Added the required column `location` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "hasTourGuide",
ADD COLUMN     "facility" TEXT[],
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "locationMaps" TEXT;

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DestinationPackage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "facility" TEXT[],
    "thumbnail" TEXT,
    "extraBenefits" TEXT[],

    CONSTRAINT "DestinationPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DestinationPackageDestination" (
    "id" SERIAL NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "destinationOrder" INTEGER NOT NULL,
    "packageId" INTEGER NOT NULL,

    CONSTRAINT "DestinationPackageDestination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageTicket" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "availableDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackageTicket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DestinationPackageDestination" ADD CONSTRAINT "DestinationPackageDestination_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DestinationPackageDestination" ADD CONSTRAINT "DestinationPackageDestination_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "DestinationPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageTicket" ADD CONSTRAINT "PackageTicket_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "DestinationPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
