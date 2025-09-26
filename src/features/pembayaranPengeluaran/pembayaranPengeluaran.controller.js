import * as pembayaranPengeluaranService from "./pembayaranPengeluaran.service.js";

export async function getAllPembayaranPengeluaran(req, res) {
  try {
    const data = await pembayaranPengeluaranService.getAll();
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data pembayaran pengeluaran",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mendapatkan data pembayaran pengeluaran",
      error: error.message,
      data: null,
    });
  }
}

export async function getPembayaranPengeluaranById(req, res) {
  try {
    const data = await pembayaranPengeluaranService.getById(
      Number(req.params.id)
    );
    if (!data)
      return res.status(404).json({
        success: false,
        message: "Pembayaran pengeluaran tidak ditemukan",
        data: null,
      });
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data pembayaran pengeluaran",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mendapatkan data pembayaran pengeluaran",
      error: error.message,
      data: null,
    });
  }
}

export async function createPembayaranPengeluaran(req, res) {
  const data = await pembayaranPengeluaranService.create(req.body);
  res.status(201).json(data);
}

export async function updatePembayaranPengeluaran(req, res) {
  const data = await pembayaranPengeluaranService.update(
    Number(req.params.id),
    req.body
  );
  if (!data) return res.status(404).json({ error: "Not found" });
  res.json(data);
}

export async function deletePembayaranPengeluaran(req, res) {
  const success = await pembayaranPengeluaranService.remove(
    Number(req.params.id)
  );
  if (!success) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
}
