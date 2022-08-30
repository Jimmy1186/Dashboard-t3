/*
  Warnings:

  - You are about to drop the column `during` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `charge` DROP FOREIGN KEY `Charge_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `charge` DROP FOREIGN KEY `Charge_userId_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_userId_fkey`;

-- DropForeignKey
ALTER TABLE `installment` DROP FOREIGN KEY `Installment_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `primarycompany` DROP FOREIGN KEY `PrimaryCompany_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `primarycompany` DROP FOREIGN KEY `PrimaryCompany_notes_fkey`;

-- DropForeignKey
ALTER TABLE `primarycompany` DROP FOREIGN KEY `PrimaryCompany_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `secondarycompany` DROP FOREIGN KEY `SecondaryCompany_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `secondarycompany` DROP FOREIGN KEY `SecondaryCompany_notes_fkey`;

-- DropForeignKey
ALTER TABLE `secondarycompany` DROP FOREIGN KEY `SecondaryCompany_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `during`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Installment` ADD CONSTRAINT `Installment_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrimaryCompany` ADD CONSTRAINT `PrimaryCompany_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrimaryCompany` ADD CONSTRAINT `PrimaryCompany_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrimaryCompany` ADD CONSTRAINT `PrimaryCompany_notes_fkey` FOREIGN KEY (`notes`) REFERENCES `Note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SecondaryCompany` ADD CONSTRAINT `SecondaryCompany_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SecondaryCompany` ADD CONSTRAINT `SecondaryCompany_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SecondaryCompany` ADD CONSTRAINT `SecondaryCompany_notes_fkey` FOREIGN KEY (`notes`) REFERENCES `Note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Charge` ADD CONSTRAINT `Charge_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Charge` ADD CONSTRAINT `Charge_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
