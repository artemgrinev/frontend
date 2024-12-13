/*
  Warnings:

  - You are about to drop the column `name` on the `Ingredient` table. All the data in the column will be lost.
  - The `count` column on the `Ingredient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `amount` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "name",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "count",
ADD COLUMN     "count" INTEGER;
