/*
  Warnings:

  - The values [PRIMARY1,PRIMARY2] on the enum `class_class_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `std_img` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `std_parent_address` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `std_parent_identity` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `std_parent_lastname` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `std_parent_name` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `std_parent_phone` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `std_parent_status` on the `student` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `img_grade` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_profile` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `std_grade` to the `student` table without a default value. This is not possible if the table is not empty.
  - Made the column `std_email` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `std_identity` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `enrollment_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `enrollment_std_id_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_std_id_fkey`;

-- DropForeignKey
ALTER TABLE `status` DROP FOREIGN KEY `status_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `status` DROP FOREIGN KEY `status_hist_id_fkey`;

-- AlterTable
ALTER TABLE `class` MODIFY `class_type` ENUM('SECONDARY1', 'SECONDARY2') NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `std_img`,
    DROP COLUMN `std_parent_address`,
    DROP COLUMN `std_parent_identity`,
    DROP COLUMN `std_parent_lastname`,
    DROP COLUMN `std_parent_name`,
    DROP COLUMN `std_parent_phone`,
    DROP COLUMN `std_parent_status`,
    ADD COLUMN `img_grade` VARCHAR(191) NOT NULL,
    ADD COLUMN `img_profile` VARCHAR(191) NOT NULL,
    ADD COLUMN `std_grade` VARCHAR(191) NOT NULL,
    MODIFY `std_email` VARCHAR(191) NOT NULL,
    MODIFY `std_identity` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `enrollment`;

-- DropTable
DROP TABLE `history`;

-- DropTable
DROP TABLE `status`;

-- CreateTable
CREATE TABLE `info_enroll_online` (
    `info_on_id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_on_type` ENUM('W8', 'AGREE', 'REJECT') NOT NULL DEFAULT 'W8',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`info_on_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `info_enroll_offline` (
    `info_off_id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_off_type` ENUM('W8', 'AGREE', 'REJECT') NOT NULL DEFAULT 'W8',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`info_off_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `user_lastname` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_identity` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `user_role` ENUM('ADMIN', 'GUEST') NOT NULL DEFAULT 'GUEST',

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `info_enroll_online` ADD CONSTRAINT `info_enroll_online_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `info_enroll_offline` ADD CONSTRAINT `info_enroll_offline_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
