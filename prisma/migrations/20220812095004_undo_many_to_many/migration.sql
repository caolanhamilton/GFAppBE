/*
  Warnings:

  - You are about to drop the `UserOnFavourites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnFavourites" DROP CONSTRAINT "UserOnFavourites_locationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnFavourites" DROP CONSTRAINT "UserOnFavourites_userId_fkey";

-- DropTable
DROP TABLE "UserOnFavourites";

-- CreateTable
CREATE TABLE "_favRelation" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favRelation_AB_unique" ON "_favRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_favRelation_B_index" ON "_favRelation"("B");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favRelation" ADD CONSTRAINT "_favRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favRelation" ADD CONSTRAINT "_favRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
