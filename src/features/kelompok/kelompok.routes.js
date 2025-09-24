// kelompok.routes.js

import express from "express";
import * as kelompokController from "./kelompok.controller.js"; // Ganti import

const router = express.Router();

router.get("/", kelompokController.getAllKelompok); // Langsung gunakan fungsinya
router.get("/search", kelompokController.getKelompokSearch); // Langsung gunakan fungsinya
router.post("/", kelompokController.createKelompok); // Langsung gunakan fungsinya
router.put("/:id", kelompokController.editKelompok); // Langsung gunakan fungsinya
router.delete("/:id", kelompokController.deleteKelompok); // Langsung gunakan fungsinya
router.get("/:id", kelompokController.getKelompokById);

export default router; // Ganti export
