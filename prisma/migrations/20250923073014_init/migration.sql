/*
  Warnings:

  - You are about to drop the `group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."group";

-- CreateTable
CREATE TABLE "public"."anggota" (
    "id" SERIAL NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anggota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."kelompok" (
    "id" SERIAL NOT NULL,
    "nama_kelompok" TEXT NOT NULL,
    "deskripsi" TEXT,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kelompok_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."anggota_kelompok" (
    "id_kelompok" INTEGER NOT NULL,
    "id_anggota" INTEGER NOT NULL,
    "bergabung_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anggota_kelompok_pkey" PRIMARY KEY ("id_kelompok","id_anggota")
);

-- CreateTable
CREATE TABLE "public"."pengeluaran" (
    "id" SERIAL NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "jumlah_total" DECIMAL(65,30) NOT NULL,
    "tanggal_pengeluaran" DATE NOT NULL,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_kelompok" INTEGER NOT NULL,
    "id_anggota_pembayar" INTEGER NOT NULL,

    CONSTRAINT "pengeluaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."jatah_urunan" (
    "id" SERIAL NOT NULL,
    "jumlah_jatah" DECIMAL(65,30) NOT NULL,
    "sudah_lunas" BOOLEAN NOT NULL DEFAULT false,
    "id_pengeluaran" INTEGER NOT NULL,
    "id_anggota_penanggung" INTEGER NOT NULL,

    CONSTRAINT "jatah_urunan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anggota_email_key" ON "public"."anggota"("email");

-- AddForeignKey
ALTER TABLE "public"."anggota_kelompok" ADD CONSTRAINT "anggota_kelompok_id_kelompok_fkey" FOREIGN KEY ("id_kelompok") REFERENCES "public"."kelompok"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."anggota_kelompok" ADD CONSTRAINT "anggota_kelompok_id_anggota_fkey" FOREIGN KEY ("id_anggota") REFERENCES "public"."anggota"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pengeluaran" ADD CONSTRAINT "pengeluaran_id_kelompok_fkey" FOREIGN KEY ("id_kelompok") REFERENCES "public"."kelompok"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pengeluaran" ADD CONSTRAINT "pengeluaran_id_anggota_pembayar_fkey" FOREIGN KEY ("id_anggota_pembayar") REFERENCES "public"."anggota"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."jatah_urunan" ADD CONSTRAINT "jatah_urunan_id_pengeluaran_fkey" FOREIGN KEY ("id_pengeluaran") REFERENCES "public"."pengeluaran"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."jatah_urunan" ADD CONSTRAINT "jatah_urunan_id_anggota_penanggung_fkey" FOREIGN KEY ("id_anggota_penanggung") REFERENCES "public"."anggota"("id") ON DELETE CASCADE ON UPDATE CASCADE;
