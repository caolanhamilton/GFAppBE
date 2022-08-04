/*
  Warnings:

  - You are about to drop the `UsersOnLocations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnLocations" DROP CONSTRAINT "UsersOnLocations_locationId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnLocations" DROP CONSTRAINT "UsersOnLocations_userId_fkey";

-- DropTable
DROP TABLE "UsersOnLocations";
