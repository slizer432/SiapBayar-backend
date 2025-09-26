import prisma from "../../lib/prisma.js";

export async function getAll() {
  return prisma.pembayaranPengeluaran.findMany({
    include: {
      anggota: true,
      pengeluaran: true,
    },
  });
}

export async function getById(id) {
  return prisma.pembayaranPengeluaran.findUnique({
    where: { pengeluaranId: id },
    include: {
      anggota: true,
      pengeluaran: true,
    },
  });
}

export async function create(data) {
  return prisma.pembayaranPengeluaran.create({ data });
}

export async function update(id, data) {
  return prisma.pembayaranPengeluaran.update({ where: { id }, data });
}

export async function remove(id) {
  const deleted = await prisma.pembayaranPengeluaran.delete({ where: { id } });
  return !!deleted;
}
