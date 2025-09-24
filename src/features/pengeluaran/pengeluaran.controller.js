import * as pengeluaranService from "./pengeluaran.service.js";

export async function getAllPengeluaran(req, res) {
  const data = await pengeluaranService.getAll();
  res.json(data);
}

export async function getPengeluaranById(req, res) {
  const data = await pengeluaranService.getById(Number(req.params.id));
  if (!data) return res.status(404).json({ error: "Not found" });
  res.json(data);
}

export async function createPengeluaran(req, res) {
  const data = await pengeluaranService.create(req.body);
  res.status(201).json(data);
}

export async function updatePengeluaran(req, res) {
  const data = await pengeluaranService.update(Number(req.params.id), req.body);
  if (!data) return res.status(404).json({ error: "Not found" });
  res.json(data);
}

export async function deletePengeluaran(req, res) {
  const success = await pengeluaranService.remove(Number(req.params.id));
  if (!success) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
}
