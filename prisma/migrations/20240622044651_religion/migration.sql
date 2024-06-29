/*
  Warnings:

  - You are about to alter the column `user_role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Enum(EnumId(5))`.
  - You are about to drop the `info_enroll_offline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `info_enroll_online` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gender_id` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nation_id` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `religion_id` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `std_grade` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `std_lastnameEN` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `std_nameEN` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `std_school` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `std_yearIn` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `info_enroll_offline` DROP FOREIGN KEY `info_enroll_offline_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `info_enroll_online` DROP FOREIGN KEY `info_enroll_online_user_id_fkey`;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `gender_id` INTEGER NOT NULL,
    ADD COLUMN `nation_id` INTEGER NOT NULL,
    ADD COLUMN `religion_id` INTEGER NOT NULL,
    ADD COLUMN `std_grade` VARCHAR(191) NOT NULL,
    ADD COLUMN `std_lastnameEN` VARCHAR(191) NOT NULL,
    ADD COLUMN `std_nameEN` VARCHAR(191) NOT NULL,
    ADD COLUMN `std_school` VARCHAR(191) NOT NULL,
    ADD COLUMN `std_yearIn` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `gender_id` INTEGER NOT NULL,
    MODIFY `user_role` ENUM('ADMIN', 'STUDENT', 'PARENT') NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE `info_enroll_offline`;

-- DropTable
DROP TABLE `info_enroll_online`;

-- CreateTable
CREATE TABLE `gender` (
    `gender_id` INTEGER NOT NULL AUTO_INCREMENT,
    `gender_type` ENUM('MR', 'BOY', 'MISS', 'MRS', 'GIRL') NOT NULL,

    PRIMARY KEY (`gender_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `religion` (
    `religion_id` INTEGER NOT NULL AUTO_INCREMENT,
    `religion_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`religion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nationality` (
    `nation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nation_name` ENUM('THAI', 'LAO', 'JAPANESE', 'US', 'CANADIAN', 'KOREAN', 'VIETNAMESE', 'UK', 'GERMAN', 'DUTCH', 'OTHER') NOT NULL,

    PRIMARY KEY (`nation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_nation_id_fkey` FOREIGN KEY (`nation_id`) REFERENCES `nationality`(`nation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_religion_id_fkey` FOREIGN KEY (`religion_id`) REFERENCES `religion`(`religion_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `gender`(`gender_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `gender`(`gender_id`) ON DELETE CASCADE ON UPDATE CASCADE;
