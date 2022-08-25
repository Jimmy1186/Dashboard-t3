/*
  Warnings:

  - You are about to drop the column `primaryCompanyId` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryCompanyId` on the `note` table. All the data in the column will be lost.
  - Added the required column `notes` to the `PrimaryCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `SecondaryCompany` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_primaryCompanyId_fkey`;

-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_secondaryCompanyId_fkey`;

-- AlterTable
ALTER TABLE `note` DROP COLUMN `primaryCompanyId`,
    DROP COLUMN `secondaryCompanyId`;

-- AlterTable
ALTER TABLE `primarycompany` ADD COLUMN `notes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `secondarycompany` ADD COLUMN `notes` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PrimaryCompany` ADD CONSTRAINT `PrimaryCompany_notes_fkey` FOREIGN KEY (`notes`) REFERENCES `Note`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SecondaryCompany` ADD CONSTRAINT `SecondaryCompany_notes_fkey` FOREIGN KEY (`notes`) REFERENCES `Note`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
