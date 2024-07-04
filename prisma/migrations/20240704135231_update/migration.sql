/*
  Warnings:

  - You are about to alter the column `gender_type` on the `gender` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `nation_name` on the `nationality` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - Added the required column `eth_id` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gender` MODIFY `gender_type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `nationality` MODIFY `nation_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `eth_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ethicity` (
    `eth_id` INTEGER NOT NULL AUTO_INCREMENT,
    `eth_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`eth_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_eth_id_fkey` FOREIGN KEY (`eth_id`) REFERENCES `ethicity`(`eth_id`) ON DELETE CASCADE ON UPDATE CASCADE;
