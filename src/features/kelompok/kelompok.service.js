import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllKelompokService = async () => {
  const semuaKelompok = await prisma.kelompok.findMany();
  return semuaKelompok;
};

export const getKelompokSearch = async (search) => {
  const kelompok = await prisma.kelompok.findMany({
    where: search
      ? {
          namaKelompok: {
            contains: search,
            mode: "insensitive",
          },
        }
      : undefined,
    select: {
      id: true,
      namaKelompok: true,
      deskripsi: true,
      dibuatPada: true,
    },
  });
  return kelompok;
};

export const createKelompokService = async (data) => {
  const kelompok = await prisma.kelompok.create({
    data,
    select: {
      id: true,
      namaKelompok: true,
      deskripsi: true,
    },
  });
  return kelompok;
};

export const editKelompokService = async (id, data) => {
  const kelompok = await prisma.kelompok.update({
    where: { id },
    data,
    select: {
      id: true,
      namaKelompok: true,
      deskripsi: true,
    },
  });
};

export const deleteKelompokService = async (id) => {
  await prisma.kelompok.delete({
    where: {
      id,
    },
  });
};
