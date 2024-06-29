/*
  Warnings:

  - You are about to alter the column `major_type` on the `major` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `major` MODIFY `major_type` VARCHAR(191) NOT NULL;
