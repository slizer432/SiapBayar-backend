import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const anggota = await prisma.anggota.findMany();
    const kelompok = await prisma.kelompok.findMany({
      include: {
        anggota: { include: { anggota: true } },
        pengeluaran: {
          include: {
            pembayaran: { include: { anggota: true } },
            jatahUrunan: { include: { penanggung: true } },
          },
        },
      },
    });
    const pengeluaran = await prisma.pengeluaran.findMany({
      include: {
        pembayaran: { include: { anggota: true } },
        jatahUrunan: { include: { penanggung: true } },
      },
    });
    const jatahUrunan = await prisma.jatahUrunan.findMany({
      include: { penanggung: true, pengeluaran: true },
    });
    const pembayaranPengeluaran = await prisma.pembayaranPengeluaran.findMany({
      include: { anggota: true, pengeluaran: true },
    });
    res.json({
      anggota,
      kelompok,
      pengeluaran,
      jatahUrunan,
      pembayaranPengeluaran,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
