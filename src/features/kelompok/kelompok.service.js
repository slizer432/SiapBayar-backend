export const createAnggotaDanGabungKelompok = async (
  namaLengkap,
  kelompokId
) => {
  // Buat anggota baru
  const anggota = await prisma.anggota.create({
    data: {
      namaLengkap,
      kelompok: {
        create: [{ kelompokId }],
      },
    },
    select: {
      id: true,
      namaLengkap: true,
      kelompok: {
        select: { kelompokId: true },
      },
    },
  });
  return anggota;
};
import { PrismaClient } from "@prisma/client";
import { parse } from "dotenv";
const prisma = new PrismaClient();

export const getAllKelompokService = async () => {
  const semuaKelompok = await prisma.kelompok.findMany({
    include: {
      anggota: {
        include: {
          anggota: true,
        },
      },
      pengeluaran: {
        include: {
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
      },
    },
  });
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
    include: {
      anggota: {
        include: {
          anggota: true,
        },
      },
      pengeluaran: {
        include: {
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
      },
    },
  });
  return kelompok;
};

export const createKelompokService = async (data) => {
  const kelompok = await prisma.kelompok.create({
    data,
  });
  return kelompok;
};

export const editKelompokService = async (id, data) => {
  const kelompok = await prisma.kelompok.update({
    where: { id: parseInt(id) },
    data,
  });
  return kelompok;
};

export const deleteKelompokService = async (id) => {
  await prisma.kelompok.delete({
    where: {
      id: parseInt(id),
    },
  });
};

export const getKelompokByIdService = async (id) => {
  const kelompok = await prisma.kelompok.findUnique({
    where: { id: parseInt(id) },
    include: {
      anggota: {
        include: {
          anggota: true,
        },
      },
      pengeluaran: true,
    },
  });
  return kelompok;
};
