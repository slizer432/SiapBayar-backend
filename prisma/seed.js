import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create sample anggota
  const anggota1 = await prisma.anggota.create({
    data: { namaLengkap: "Budi Santoso" },
  });
  const anggota2 = await prisma.anggota.create({
    data: { namaLengkap: "Siti Aminah" },
  });
  const anggota3 = await prisma.anggota.create({
    data: { namaLengkap: "Rizky Hidayat" },
  });
  const anggota4 = await prisma.anggota.create({
    data: { namaLengkap: "Dewi Lestari" },
  });

  // Create kelompok
  const kelompok1 = await prisma.kelompok.create({
    data: {
      namaKelompok: "Patungan Liburan",
      deskripsi: "Liburan ke Bali bersama",
      anggota: {
        create: [
          { anggota: { connect: { id: anggota1.id } } },
          { anggota: { connect: { id: anggota2.id } } },
          { anggota: { connect: { id: anggota3.id } } },
        ],
      },
    },
  });

  const kelompok2 = await prisma.kelompok.create({
    data: {
      namaKelompok: "Arisan Bulanan",
      deskripsi: "Arisan keluarga setiap bulan",
      anggota: {
        create: [
          { anggota: { connect: { id: anggota2.id } } },
          { anggota: { connect: { id: anggota3.id } } },
          { anggota: { connect: { id: anggota4.id } } },
        ],
      },
    },
  });

  // Create pengeluaran untuk kelompok1
  // Hitung total jatah urunan agar sama dengan jumlahTotal
  const pengeluaran1JumlahTotal = 2000000;
  const pengeluaran1PembayarIds = [anggota1.id, anggota2.id];
  const pengeluaran1PenanggungIds = [anggota3.id];
  const pengeluaran1JatahPerOrang =
    pengeluaran1JumlahTotal / pengeluaran1PenanggungIds.length;

  const pengeluaran1 = await prisma.pengeluaran.create({
    data: {
      deskripsi: "Sewa Villa",
      jumlahTotal: pengeluaran1JumlahTotal,
      tanggalPengeluaran: new Date("2025-09-20"),
      kelompok: { connect: { id: kelompok1.id } },
      pembayaran: {
        create: [
          { anggota: { connect: { id: anggota1.id } }, jumlahBayar: 1200000 },
          { anggota: { connect: { id: anggota2.id } }, jumlahBayar: 800000 },
        ],
      },
      jatahUrunan: {
        create: pengeluaran1PenanggungIds.map((id) => ({
          penanggung: { connect: { id } },
          jumlahJatah: pengeluaran1JatahPerOrang,
        })),
      },
    },
    include: {
      pembayaran: true,
      jatahUrunan: { include: { penanggung: true } },
    },
  });

  // Create pengeluaran untuk kelompok2
  const pengeluaran2JumlahTotal = 600000;
  const pengeluaran2PembayarIds = [anggota4.id];
  const pengeluaran2PenanggungIds = [anggota2.id, anggota3.id];
  const pengeluaran2JatahPerOrang =
    pengeluaran2JumlahTotal / pengeluaran2PenanggungIds.length;

  const pengeluaran2 = await prisma.pengeluaran.create({
    data: {
      deskripsi: "Makan Bersama",
      jumlahTotal: pengeluaran2JumlahTotal,
      tanggalPengeluaran: new Date("2025-09-22"),
      kelompok: { connect: { id: kelompok2.id } },
      pembayaran: {
        create: [
          { anggota: { connect: { id: anggota4.id } }, jumlahBayar: 600000 },
        ],
      },
      jatahUrunan: {
        create: pengeluaran2PenanggungIds.map((id) => ({
          penanggung: { connect: { id } },
          jumlahJatah: pengeluaran2JatahPerOrang,
        })),
      },
    },
    include: {
      pembayaran: true,
      jatahUrunan: { include: { penanggung: true } },
    },
  });

  // Tampilkan data summary
  console.log("Kelompok 1 - Sewa Villa");
  console.log(
    "Pembayar:",
    pengeluaran1.pembayaran.map((p) => p.anggotaId)
  );
  console.log(
    "Penanggung hutang:",
    pengeluaran1.jatahUrunan.map((j) => j.penanggung.namaLengkap)
  );

  console.log("Kelompok 2 - Makan Bersama");
  console.log(
    "Pembayar:",
    pengeluaran2.pembayaran.map((p) => p.anggotaId)
  );
  console.log(
    "Penanggung hutang:",
    pengeluaran2.jatahUrunan.map((j) => j.penanggung.namaLengkap)
  );

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
