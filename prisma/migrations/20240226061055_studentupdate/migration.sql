/*
  Warnings:

  - You are about to drop the column `img_grade` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `std_grade` on the `student` table. All the data in the column will be lost.
  - Added the required column `status` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` DROP COLUMN `img_grade`,
    DROP COLUMN `std_grade`,
    ADD COLUMN `status` ENUM('W8', 'AGREE', 'REJECT') NOT NULL;
