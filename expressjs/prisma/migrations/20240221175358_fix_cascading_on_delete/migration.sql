-- DropForeignKey
ALTER TABLE "GaleryDestination" DROP CONSTRAINT "GaleryDestination_destinationId_fkey";

-- AddForeignKey
ALTER TABLE "GaleryDestination" ADD CONSTRAINT "GaleryDestination_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;
