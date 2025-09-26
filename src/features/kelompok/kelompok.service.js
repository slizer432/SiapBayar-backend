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

  // Mapping agar sesuai format JSON yang diinginkan (struktur detail)
  const result = semuaKelompok.map(kelompok => ({
    id: kelompok.id,
    namaKelompok: kelompok.namaKelompok,
    deskripsi: kelompok.deskripsi,
    tanggalPengeluaran: kelompok.tanggalPengeluaran ?? null,
    dibuatPada: kelompok.dibuatPada,
    anggota: (kelompok.anggota || []).map(a => ({
      kelompokId: a.kelompokId,
      anggotaId: a.anggotaId,
      bergabungPada: a.bergabungPada,
      anggota: a.anggota ? {
        id: a.anggota.id,
        namaLengkap: a.anggota.namaLengkap,
        dibuatPada: a.anggota.dibuatPada
      } : null
    })),
    pengeluaran: (kelompok.pengeluaran || []).map(p => ({
      id: p.id,
      deskripsi: p.deskripsi,
      jumlahTotal: p.jumlahTotal,
      tanggalPengeluaran: p.tanggalPengeluaran ?? null,
      dibuatPada: p.dibuatPada,
      kelompokId: p.kelompokId,
      pembayaran: (p.pembayaran || []).map(pay => ({
        pengeluaranId: pay.pengeluaranId,
        anggotaId: pay.anggotaId,
        jumlahBayar: pay.jumlahBayar,
        anggota: pay.anggota ? {
          id: pay.anggota.id,
          namaLengkap: pay.anggota.namaLengkap,
          dibuatPada: pay.anggota.dibuatPada
        } : null
      })),
      jatahUrunan: (p.jatahUrunan || []).map(j => ({
        id: j.id,
        jumlahJatah: j.jumlahJatah,
        sudahLunas: j.sudahLunas,
        pengeluaranId: j.pengeluaranId,
        penanggungId: j.penanggungId,
        penanggung: j.penanggung ? {
          id: j.penanggung.id,
          namaLengkap: j.penanggung.namaLengkap,
          dibuatPada: j.penanggung.dibuatPada
        } : null
      }))
    }))
  }));
  return result;
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
