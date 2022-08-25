/*
  Warnings:

  - You are about to drop the column `notes` on the `primarycompany` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `secondarycompany` table. All the data in the column will be lost.
  - Added the required column `primaryCompanyId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondaryCompanyId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `primarycompany` DROP FOREIGN KEY `PrimaryCompany_notes_fkey`;

-- DropForeignKey
ALTER TABLE `secondarycompany` DROP FOREIGN KEY `SecondaryCompany_notes_fkey`;

-- AlterTable
ALTER TABLE `note` ADD COLUMN `primaryCompanyId` INTEGER NOT NULL,
    ADD COLUMN `secondaryCompanyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `primarycompany` DROP COLUMN `notes`;

-- AlterTable
ALTER TABLE `secondarycompany` DROP COLUMN `notes`;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_primaryCompanyId_fkey` FOREIGN KEY (`primaryCompanyId`) REFERENCES `PrimaryCompany`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_secondaryCompanyId_fkey` FOREIGN KEY (`secondaryCompanyId`) REFERENCES `SecondaryCompany`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
