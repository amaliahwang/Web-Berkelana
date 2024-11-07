/*
  Warnings:

  - Added the required column `expiredAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goingAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "goingAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "referenceId" TEXT NOT NULL;
