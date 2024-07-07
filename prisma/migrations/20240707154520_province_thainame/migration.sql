/*
  Warnings:

  - Added the required column `prov_thainame` to the `Province` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `province` ADD COLUMN `prov_thainame` VARCHAR(191) NOT NULL;
