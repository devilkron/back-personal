/*
  Warnings:

  - Added the required column `user_id` to the `major` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `major` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `major` ADD CONSTRAINT `major_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
