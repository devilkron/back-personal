/*
  Warnings:

  - You are about to drop the column `user_id` on the `major` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `major` DROP FOREIGN KEY `major_user_id_fkey`;

-- AlterTable
ALTER TABLE `major` DROP COLUMN `user_id`;
