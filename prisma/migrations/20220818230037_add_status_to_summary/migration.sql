-- AlterTable
ALTER TABLE `summarizations` ADD COLUMN `status` ENUM('PROCESSING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PROCESSING';
