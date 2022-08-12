/*
  Warnings:

  - You are about to drop the `_favRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "_favRelation" DROP CONSTRAINT "_favRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_favRelation" DROP CONSTRAINT "_favRelation_B_fkey";

-- DropTable
DROP TABLE "_favRelation";

-- CreateTable
CREATE TABLE "UserOnFavourites" (
    "userId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "UserOnFavourites_pkey" PRIMARY KEY ("userId","locationId")
);

-- AddForeignKey
ALTER TABLE "UserOnFavourites" ADD CONSTRAINT "UserOnFavourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnFavourites" ADD CONSTRAINT "UserOnFavourites_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
