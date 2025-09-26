import prisma from "../../lib/prisma.js";

export async function getAll() {
  return prisma.pengeluaran.findMany({
    include: {
      kelompok: true,
      pembayaran: {
        include: {
          anggota: true,
        },
      },
      jatahUrunan: {
        include: {
          penanggung: true,
        },
      },
    },
  });
}

export async function getById(id) {
  return prisma.pengeluaran.findUnique({
    where: { id },
    include: {
      kelompok: true,
      pembayaran: {
        include: {
          anggota: true,
        },
      },
      jatahUrunan: {
        include: {
          penanggung: true,
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
