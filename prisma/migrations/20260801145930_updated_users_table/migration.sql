/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spotifyAccountId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scopes` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotifyAccountId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotifyProfileUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotifyUri` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_expires_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "accountId",
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "refreshToken" TEXT NOT NULL,
ADD COLUMN     "scopes" TEXT NOT NULL,
ADD COLUMN     "spotifyAccountId" TEXT NOT NULL,
ADD COLUMN     "spotifyProfileUrl" TEXT NOT NULL,
ADD COLUMN     "spotifyUri" TEXT NOT NULL,
ADD COLUMN     "token_expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "User_spotifyAccountId_key" ON "User"("spotifyAccountId");
