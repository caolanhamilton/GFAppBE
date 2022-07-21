/*
  Warnings:

  - You are about to drop the column `title` on the `Location` table. All the data in the column will be lost.
  - Added the required column `name` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "phone" VARCHAR(255) NOT NULL;
