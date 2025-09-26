import prisma from "../../lib/prisma.js";

export async function getAll() {
  return prisma.anggota.findMany({
    include: {
      kelompok: {
        include: {
          kelompok: true,
        },
      },
      pembayaranPengeluaran: {
        include: {
          pengeluaran: true,
        },
      },
      jatahDitanggung: {
        include: {
          pengeluaran: true,
        },
      },
    },
  });
}

export async function getById(id) {
  return prisma.anggota.findUnique({
    where: { id },
    include: {
      kelompok: {
        include: {
          kelompok: true,
        },
      },
      pembayaranPengeluaran: {
        include: {
          pengeluaran: true,
        },
      },
      jatahDitanggung: {
        include: {
          pengeluaran: true,
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
