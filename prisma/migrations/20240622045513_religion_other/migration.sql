/*
  Warnings:

  - Added the required column `religion_other` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `religion_other` VARCHAR(191) NOT NULL;
