import * as pembayaranPengeluaranService from "./pembayaranPengeluaran.service.js";

export async function getAllPembayaranPengeluaran(req, res) {
  const data = await pembayaranPengeluaranService.getAll();
  res.json(data);
}

export async function getPembayaranPengeluaranById(req, res) {
  const data = await pembayaranPengeluaranService.getById(
    Number(req.params.id)
  );
  if (!data) return res.status(404).json({ error: "Not found" });
  res.json(data);
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
