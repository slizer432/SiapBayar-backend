/*
  Warnings:

  - You are about to drop the column `id_anggota_pembayar` on the `pengeluaran` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."pengeluaran" DROP CONSTRAINT "pengeluaran_id_anggota_pembayar_fkey";

-- AlterTable
ALTER TABLE "public"."pengeluaran" DROP COLUMN "id_anggota_pembayar";

-- CreateTable
CREATE TABLE "public"."pembayaran_pengeluaran" (
    "id_pengeluaran" INTEGER NOT NULL,
    "id_anggota_pembayar" INTEGER NOT NULL,
    "jumlah_bayar" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "pembayaran_pengeluaran_pkey" PRIMARY KEY ("id_pengeluaran","id_anggota_pembayar")
);

-- AddForeignKey
ALTER TABLE "public"."pembayaran_pengeluaran" ADD CONSTRAINT "pembayaran_pengeluaran_id_pengeluaran_fkey" FOREIGN KEY ("id_pengeluaran") REFERENCES "public"."pengeluaran"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pembayaran_pengeluaran" ADD CONSTRAINT "pembayaran_pengeluaran_id_anggota_pembayar_fkey" FOREIGN KEY ("id_anggota_pembayar") REFERENCES "public"."anggota"("id") ON DELETE CASCADE ON UPDATE CASCADE;
