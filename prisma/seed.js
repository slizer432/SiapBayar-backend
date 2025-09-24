import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create sample anggota
  const anggota1 = await prisma.anggota.create({
    data: {
      namaLengkap: "Budi Santoso",
    },
  });
  const anggota2 = await prisma.anggota.create({
    data: {
      namaLengkap: "Siti Aminah",
    },
  });

  // Create kelompok
  const kelompok = await prisma.kelompok.create({
    data: {
      namaKelompok: "Patungan Liburan",
      deskripsi: "Liburan ke Bali bersama",
      anggota: {
        create: [
          { anggota: { connect: { id: anggota1.id } } },
          { anggota: { connect: { id: anggota2.id } } },
        ],
      },
    },
  });

  // Create pengeluaran
  const pengeluaran = await prisma.pengeluaran.create({
    data: {
      deskripsi: "Sewa Villa",
      jumlahTotal: 2000000,
      tanggalPengeluaran: new Date("2025-09-20"),
      kelompok: { connect: { id: kelompok.id } },
      pembayaran: {
        create: [
          { anggota: { connect: { id: anggota1.id } }, jumlahBayar: 1200000 },
          { anggota: { connect: { id: anggota2.id } }, jumlahBayar: 800000 },
        ],
      },
      jatahUrunan: {
        create: [
          {
            penanggung: { connect: { id: anggota1.id } },
            jumlahJatah: 1000000,
          },
          {
            penanggung: { connect: { id: anggota2.id } },
            jumlahJatah: 1000000,
          },
        ],
      },
    },
  });

  console.log("Seeder finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
