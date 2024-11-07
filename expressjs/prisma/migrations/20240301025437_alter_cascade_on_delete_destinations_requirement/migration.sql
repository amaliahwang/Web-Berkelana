-- DropForeignKey
ALTER TABLE "DestinationPackageDestination" DROP CONSTRAINT "DestinationPackageDestination_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "DestinationPackageDestination" DROP CONSTRAINT "DestinationPackageDestination_packageId_fkey";

-- DropForeignKey
ALTER TABLE "PackageTicket" DROP CONSTRAINT "PackageTicket_packageId_fkey";

-- AddForeignKey
ALTER TABLE "DestinationPackageDestination" ADD CONSTRAINT "DestinationPackageDestination_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DestinationPackageDestination" ADD CONSTRAINT "DestinationPackageDestination_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "DestinationPackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageTicket" ADD CONSTRAINT "PackageTicket_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "DestinationPackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
