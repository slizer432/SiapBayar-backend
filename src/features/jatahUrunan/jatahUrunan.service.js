import prisma from "../../lib/prisma.js";

export async function getAll() {
  return prisma.jatahUrunan.findMany({
    select: {
      id: true,
      jumlahJatah: true,
      sudahLunas: true,
      penanggung: { select: { namaLengkap: true } },
      pengeluaran: { select: { deskripsi: true, jumlahTotal: true } },
    },
  });
}

export async function getById(id) {
  return prisma.jatahUrunan.findUnique({
    where: { id },
    select: {
      id: true,
      jumlahJatah: true,
      sudahLunas: true,
      penanggung: { select: { namaLengkap: true } },
      pengeluaran: { select: { deskripsi: true, jumlahTotal: true } },
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
