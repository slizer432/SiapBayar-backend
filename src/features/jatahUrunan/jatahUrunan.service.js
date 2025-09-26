import prisma from "../../lib/prisma.js";

export async function getAll() {
  return prisma.jatahUrunan.findMany({
    include: {
      penanggung: true,
      pengeluaran: true,
    },
  });
}

export async function getById(id) {
  return prisma.jatahUrunan.findUnique({
    where: { id },
    include: {
      penanggung: true,
      pengeluaran: true,
    },
  });
}

export async function create(data) {
  return prisma.jatahUrunan.create({ data });
}

export async function update(id, data) {
  return prisma.jatahUrunan.update({ where: { id }, data });
}

export async function remove(id) {
  const deleted = await prisma.jatahUrunan.delete({ where: { id } });
  return !!deleted;
}
