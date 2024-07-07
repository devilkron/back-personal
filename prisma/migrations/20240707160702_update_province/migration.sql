/*
  Warnings:

  - Added the required column `prov_id` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `prov_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_prov_id_fkey` FOREIGN KEY (`prov_id`) REFERENCES `Province`(`prov_id`) ON DELETE CASCADE ON UPDATE CASCADE;
