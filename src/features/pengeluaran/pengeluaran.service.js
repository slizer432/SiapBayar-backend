import prisma from "../../lib/prisma.js";

export async function getAll() {
  return prisma.pengeluaran.findMany({
    select: {
      id: true,
      deskripsi: true,
      jumlahTotal: true,
      tanggalPengeluaran: true,
      kelompok: { select: { namaKelompok: true } },
      pembayaran: {
        select: {
          jumlahBayar: true,
          anggota: { select: { namaLengkap: true } },
        },
      },
      jatahUrunan: {
        select: {
          jumlahJatah: true,
          penanggung: { select: { namaLengkap: true } },
        },
      },
    },
  });
}

export async function getById(id) {
  return prisma.pengeluaran.findUnique({
    where: { id },
    select: {
      id: true,
      deskripsi: true,
      jumlahTotal: true,
      tanggalPengeluaran: true,
      kelompok: { select: { namaKelompok: true } },
      pembayaran: {
        select: {
          jumlahBayar: true,
          anggota: { select: { namaLengkap: true } },
        },
      },
      jatahUrunan: {
        select: {
          jumlahJatah: true,
          penanggung: { select: { namaLengkap: true } },
        },
      },
    },
  });
}

export async function create(data) {
  return prisma.pengeluaran.create({ data });
}

export async function update(id, data) {
  return prisma.pengeluaran.update({ where: { id }, data });
}

export async function remove(id) {
  const deleted = await prisma.pengeluaran.delete({ where: { id } });
  return !!deleted;
}
