/*
  Warnings:

  - You are about to drop the column `email` on the `anggota` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."anggota_email_key";

-- AlterTable
ALTER TABLE "public"."anggota" DROP COLUMN "email";
