/*
  Warnings:

  - You are about to drop the `_LocationToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LocationToUser" DROP CONSTRAINT "_LocationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToUser" DROP CONSTRAINT "_LocationToUser_B_fkey";

-- DropTable
DROP TABLE "_LocationToUser";

-- CreateTable
CREATE TABLE "_favLoc" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_postedLoc" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReviewToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favLoc_AB_unique" ON "_favLoc"("A", "B");

-- CreateIndex
CREATE INDEX "_favLoc_B_index" ON "_favLoc"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_postedLoc_AB_unique" ON "_postedLoc"("A", "B");

-- CreateIndex
CREATE INDEX "_postedLoc_B_index" ON "_postedLoc"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReviewToUser_AB_unique" ON "_ReviewToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ReviewToUser_B_index" ON "_ReviewToUser"("B");

-- AddForeignKey
ALTER TABLE "_favLoc" ADD CONSTRAINT "_favLoc_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favLoc" ADD CONSTRAINT "_favLoc_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postedLoc" ADD CONSTRAINT "_postedLoc_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postedLoc" ADD CONSTRAINT "_postedLoc_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewToUser" ADD CONSTRAINT "_ReviewToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewToUser" ADD CONSTRAINT "_ReviewToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
