/*
  Warnings:

  - Added the required column `eth_other` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `eth_other` VARCHAR(191) NOT NULL;
