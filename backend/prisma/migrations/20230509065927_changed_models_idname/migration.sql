/*
  Warnings:

  - The primary key for the `Friendships` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `friendshipId` on the `Friendships` table. All the data in the column will be lost.
  - The primary key for the `Status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `statusId` on the `Status` table. All the data in the column will be lost.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Users` table. All the data in the column will be lost.
  - The required column `id` was added to the `Friendships` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id` to the `Status` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Friendships" DROP CONSTRAINT "Friendships_friendId_fkey";

-- DropForeignKey
ALTER TABLE "Friendships" DROP CONSTRAINT "Friendships_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Friendships" DROP CONSTRAINT "Friendships_userId_fkey";

-- AlterTable
ALTER TABLE "Friendships" DROP CONSTRAINT "Friendships_pkey",
DROP COLUMN "friendshipId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Friendships_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Status" DROP CONSTRAINT "Status_pkey",
DROP COLUMN "statusId",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Status_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Friendships" ADD CONSTRAINT "Friendships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendships" ADD CONSTRAINT "Friendships_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendships" ADD CONSTRAINT "Friendships_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
