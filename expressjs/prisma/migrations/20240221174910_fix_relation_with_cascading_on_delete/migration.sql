-- DropForeignKey
ALTER TABLE "Destination" DROP CONSTRAINT "Destination_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryDestination"("id") ON DELETE CASCADE ON UPDATE CASCADE;
