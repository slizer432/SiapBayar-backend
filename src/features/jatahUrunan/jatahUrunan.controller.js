import * as jatahUrunanService from "./jatahUrunan.service.js";

export async function getAllJatahUrunan(req, res) {
  try {
    const data = await jatahUrunanService.getAll();
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data jatah urunan",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mendapatkan data jatah urunan",
      error: error.message,
      data: null,
    });
  }
}

export async function getJatahUrunanById(req, res) {
  try {
    const data = await jatahUrunanService.getById(Number(req.params.id));
    if (!data)
      return res.status(404).json({
        success: false,
        message: "Jatah urunan tidak ditemukan",
        data: null,
      });
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data jatah urunan",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mendapatkan data jatah urunan",
      error: error.message,
      data: null,
    });
  }
}

export async function createJatahUrunan(req, res) {
  const data = await jatahUrunanService.create(req.body);
  res.status(201).json(data);
}

export async function updateJatahUrunan(req, res) {
  const data = await jatahUrunanService.update(Number(req.params.id), req.body);
  if (!data) return res.status(404).json({ error: "Not found" });
  res.json(data);
}

export async function deleteJatahUrunan(req, res) {
  const success = await jatahUrunanService.remove(Number(req.params.id));
  if (!success) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
}
