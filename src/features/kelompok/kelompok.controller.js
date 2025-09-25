export const createAnggotaKelompok = async (req, res) => {
  const kelompokId = parseInt(req.params.id);
  const { namaLengkap } = req.body;
  if (!namaLengkap) {
    return res.status(400).json({ message: "Nama anggota harus diisi" });
  }
  try {
    // Buat anggota baru
    const anggotaBaru = await kelompokService.createAnggotaDanGabungKelompok(
      namaLengkap,
      kelompokId
    );
    res.status(201).json(anggotaBaru);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Gagal membuat anggota dan menambah ke kelompok",
        error: error.message,
      });
  }
};
// kelompok.controller.js

import * as kelompokService from "./kelompok.service.js"; // Ganti import

export const getAllKelompok = async (req, res) => {
  try {
    const semuaKelompok = await kelompokService.getAllKelompokService();
    res.status(200).json(semuaKelompok);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan data kelompok",
      error: error.message,
    });
  }
};

export const getKelompokSearch = async (req, res) => {
  const { search } = req.query;
  try {
    const kelompok = await kelompokService.getKelompokSearch(search);
    res.status(200).json(kelompok);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan data kelompok",
      error: error.message,
    });
  }
};

export const createKelompok = async (req, res) => {
  const { namaKelompok, deskripsi } = req.body;
  if (!namaKelompok) {
    return res.status(400).json({
      message: "Nama kelompok harus diisi",
    });
  } else {
    try {
      const kelompok = await kelompokService.createKelompokService({
        namaKelompok,
        deskripsi,
      });
      res.status(201).json(kelompok);
    } catch (error) {
      res.status(500).json({
        message: "Gagal membuat kelompok",
        error: error.message,
      });
    }
  }
};

export const editKelompok = async (req, res) => {
  const { id } = req.params;
  const { namaKelompok, deskripsi } = req.body;
  if (!namaKelompok) {
    return res.status(400).json({
      message: "Edit gagal, nama kelompok harus diisi",
    });
  } else {
    try {
      const kelompok = await kelompokService.editKelompokService(id, {
        namaKelompok,
        deskripsi,
      });
      res.status(200).json(kelompok);
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengedit kelompok",
        error: error.message,
      });
    }
  }
};

export const deleteKelompok = async (req, res) => {
  const { id } = req.params;
  try {
    await kelompokService.deleteKelompokService(id);
    res.status(200).json({
      message: "Kelompok berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus kelompok",
      error: error.message,
    });
  }
};

export const getKelompokById = async (req, res) => {
  const { id } = req.params;
  try {
    const kelompok = await kelompokService.getKelompokByIdService(id);
    res.status(200).json(kelompok);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan data kelompok",
      error: error.message,
    });
  }
};
