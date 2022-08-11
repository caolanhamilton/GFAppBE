-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" VARCHAR(255) NOT NULL DEFAULT 'firstname',
ADD COLUMN     "lastName" VARCHAR(255) NOT NULL DEFAULT 'lastname';
