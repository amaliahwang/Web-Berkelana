/*
  Warnings:

  - You are about to drop the `PackageTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PackageTicket" DROP CONSTRAINT "PackageTicket_packageId_fkey";

-- DropTable
DROP TABLE "PackageTicket";
