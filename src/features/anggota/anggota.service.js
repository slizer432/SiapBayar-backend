import prisma from "../../lib/prisma.js";

export async function getAll() {
  return prisma.anggota.findMany({
    select: {
      id: true,
      namaLengkap: true,
      kelompok: {
        select: {
          kelompok: { select: { namaKelompok: true } },
        },
      },
      pembayaranPengeluaran: {
        select: {
          jumlahBayar: true,
          pengeluaran: { select: { deskripsi: true } },
        },
      },
      jatahDitanggung: {
        select: {
          jumlahJatah: true,
          pengeluaran: { select: { deskripsi: true } },
        },
      },
    },
  });
}

export async function getById(id) {
  return prisma.anggota.findUnique({
    where: { id },
    select: {
      id: true,
      namaLengkap: true,
      kelompok: {
        select: {
          kelompok: { select: { namaKelompok: true } },
        },
      },
      pembayaranPengeluaran: {
        select: {
          jumlahBayar: true,
          pengeluaran: { select: { deskripsi: true } },
        },
      },
      jatahDitanggung: {
        select: {
          jumlahJatah: true,
          pengeluaran: { select: { deskripsi: true } },
        },
      },
    },
  });
}

export async function create(data) {
  return prisma.anggota.create({ data });
}

export async function update(id, data) {
  return prisma.anggota.update({ where: { id }, data });
}

export async function remove(id) {
  const deleted = await prisma.anggota.delete({ where: { id } });
  return !!deleted;
}
