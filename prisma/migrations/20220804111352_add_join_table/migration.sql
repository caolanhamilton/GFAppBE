/*
  Warnings:

  - You are about to drop the `_favLoc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_favLoc" DROP CONSTRAINT "_favLoc_A_fkey";

-- DropForeignKey
ALTER TABLE "_favLoc" DROP CONSTRAINT "_favLoc_B_fkey";

-- DropTable
DROP TABLE "_favLoc";

-- CreateTable
CREATE TABLE "UsersOnLocations" (
    "locationId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UsersOnLocations_pkey" PRIMARY KEY ("locationId","userId")
);

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
ALTER TABLE "UsersOnLocations" ADD CONSTRAINT "UsersOnLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnLocations" ADD CONSTRAINT "UsersOnLocations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favRelation" ADD CONSTRAINT "_favRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favRelation" ADD CONSTRAINT "_favRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
