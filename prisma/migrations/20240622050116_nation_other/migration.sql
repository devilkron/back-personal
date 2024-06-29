/*
  Warnings:

  - Added the required column `nation_other` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `nation_other` VARCHAR(191) NOT NULL;
