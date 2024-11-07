-- CreateTable
CREATE TABLE "GaleryPackage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "packageId" INTEGER NOT NULL,

    CONSTRAINT "GaleryPackage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GaleryPackage" ADD CONSTRAINT "GaleryPackage_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "DestinationPackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
