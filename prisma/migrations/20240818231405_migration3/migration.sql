/*
  Warnings:

  - You are about to drop the column `adminId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
