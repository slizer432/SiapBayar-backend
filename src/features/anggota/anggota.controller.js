import * as anggotaService from "./anggota.service.js";

export async function getAllAnggota(req, res) {
  try {
    const data = await anggotaService.getAll();
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data anggota",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mendapatkan data anggota",
      error: error.message,
      data: null,
    });
  }
}

export async function getAnggotaById(req, res) {
  try {
    const data = await anggotaService.getById(Number(req.params.id));
    if (!data)
      return res.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan",
        data: null,
      });
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data anggota",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mendapatkan data anggota",
      error: error.message,
      data: null,
    });
  }
}

export async function createAnggota(req, res) {
  const data = await anggotaService.create(req.body);
  res.status(201).json(data);
}

export async function updateAnggota(req, res) {
  const data = await anggotaService.update(Number(req.params.id), req.body);
  if (!data) return res.status(404).json({ error: "Not found" });
  res.json(data);
}

export async function deleteAnggota(req, res) {
  const success = await anggotaService.remove(Number(req.params.id));
  if (!success) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
}
