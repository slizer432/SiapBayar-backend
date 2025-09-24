import * as jatahUrunanService from "./jatahUrunan.service.js";

export async function getAllJatahUrunan(req, res) {
  const data = await jatahUrunanService.getAll();
  res.json(data);
}

export async function getJatahUrunanById(req, res) {
  const data = await jatahUrunanService.getById(Number(req.params.id));
  if (!data) return res.status(404).json({ error: "Not found" });
  res.json(data);
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
