/*
  Warnings:

  - You are about to drop the `region` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `region` DROP FOREIGN KEY `Region_locationId_fkey`;

-- AlterTable
ALTER TABLE `location` MODIFY `location` VARCHAR(10) NOT NULL;

-- DropTable
DROP TABLE `region`;
