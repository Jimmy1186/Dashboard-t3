/*
  Warnings:

  - You are about to drop the column `costValue` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `task` table. All the data in the column will be lost.
  - Added the required column `amount` to the `PrimaryCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `PrimaryCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `SecondaryCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `SecondaryCompany` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `primarycompany` ADD COLUMN `amount` DECIMAL(19, 4) NOT NULL,
    ADD COLUMN `cutPayment` DECIMAL(19, 4) NULL,
    ADD COLUMN `notes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `secondarycompany` ADD COLUMN `amount` DECIMAL(19, 4) NOT NULL,
    ADD COLUMN `cutPayment` DECIMAL(19, 4) NULL,
    ADD COLUMN `notes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `costValue`,
    DROP COLUMN `totalValue`;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PrimaryCompany` ADD CONSTRAINT `PrimaryCompany_notes_fkey` FOREIGN KEY (`notes`) REFERENCES `Note`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SecondaryCompany` ADD CONSTRAINT `SecondaryCompany_notes_fkey` FOREIGN KEY (`notes`) REFERENCES `Note`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
