-- CreateTable
CREATE TABLE `class` (
    `class_id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_type` ENUM('PRIMARY1', 'PRIMARY2', 'SECONDARY1', 'SECONDARY2') NOT NULL,

    PRIMARY KEY (`class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `major` (
    `major_id` INTEGER NOT NULL AUTO_INCREMENT,
    `major_type` ENUM('MATHSCI', 'ARTMATH', 'ARTENG', 'ARTSOC', 'ARTFREE') NOT NULL,

    PRIMARY KEY (`major_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `std_id` INTEGER NOT NULL AUTO_INCREMENT,
    `std_name` VARCHAR(191) NOT NULL,
    `std_lastname` VARCHAR(191) NOT NULL,
    `std_bd` DATE NOT NULL,
    `std_address` VARCHAR(191) NOT NULL,
    `std_phone` VARCHAR(191) NOT NULL,
    `std_email` VARCHAR(191) NULL,
    `std_img` VARCHAR(191) NOT NULL,
    `std_identity` INTEGER NOT NULL,
    `std_parent_identity` INTEGER NOT NULL,
    `std_parent_name` VARCHAR(191) NOT NULL,
    `std_parent_lastname` VARCHAR(191) NOT NULL,
    `std_parent_phone` VARCHAR(191) NOT NULL,
    `std_parent_status` VARCHAR(191) NOT NULL,
    `std_parent_address` VARCHAR(191) NOT NULL,
    `class_id` INTEGER NOT NULL,
    `major_id` INTEGER NOT NULL,

    PRIMARY KEY (`std_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_name` VARCHAR(191) NOT NULL,
    `admin_lastname` VARCHAR(191) NOT NULL,
    `admin_phone` VARCHAR(191) NULL,
    `admin_address` VARCHAR(191) NULL,
    `admin_email` VARCHAR(191) NOT NULL,
    `admin_password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollment` (
    `enmt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `std_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,

    PRIMARY KEY (`enmt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history` (
    `hist_id` INTEGER NOT NULL AUTO_INCREMENT,
    `std_id` INTEGER NOT NULL,

    PRIMARY KEY (`hist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_type` ENUM('W8', 'AGREE', 'REJECT') NOT NULL DEFAULT 'W8',
    `hist_id` INTEGER NOT NULL,
    `admin_id` INTEGER NOT NULL,

    PRIMARY KEY (`status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_major_id_fkey` FOREIGN KEY (`major_id`) REFERENCES `major`(`major_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `enrollment_std_id_fkey` FOREIGN KEY (`std_id`) REFERENCES `student`(`std_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `enrollment_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_std_id_fkey` FOREIGN KEY (`std_id`) REFERENCES `student`(`std_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `status` ADD CONSTRAINT `status_hist_id_fkey` FOREIGN KEY (`hist_id`) REFERENCES `history`(`hist_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `status` ADD CONSTRAINT `status_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;
