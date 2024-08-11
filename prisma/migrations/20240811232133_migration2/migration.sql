/*
  Warnings:

  - Added the required column `adminId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectAdmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectUser_AB_unique" ON "_ProjectUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectUser_B_index" ON "_ProjectUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectAdmin_AB_unique" ON "_ProjectAdmin"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectAdmin_B_index" ON "_ProjectAdmin"("B");

-- AddForeignKey
ALTER TABLE "_ProjectUser" ADD CONSTRAINT "_ProjectUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectUser" ADD CONSTRAINT "_ProjectUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectAdmin" ADD CONSTRAINT "_ProjectAdmin_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectAdmin" ADD CONSTRAINT "_ProjectAdmin_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
