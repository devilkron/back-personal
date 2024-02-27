-- AlterTable
ALTER TABLE `student` MODIFY `status` ENUM('W8', 'AGREE', 'REJECT') NOT NULL DEFAULT 'W8';
