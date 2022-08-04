/*
  Warnings:

  - You are about to drop the `_ReviewToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_postedLoc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ReviewToUser" DROP CONSTRAINT "_ReviewToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReviewToUser" DROP CONSTRAINT "_ReviewToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_postedLoc" DROP CONSTRAINT "_postedLoc_A_fkey";

-- DropForeignKey
ALTER TABLE "_postedLoc" DROP CONSTRAINT "_postedLoc_B_fkey";

-- DropTable
DROP TABLE "_ReviewToUser";

-- DropTable
DROP TABLE "_postedLoc";
