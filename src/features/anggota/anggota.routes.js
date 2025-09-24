import { Router } from "express";
import * as anggotaController from "./anggota.controller.js";

const router = Router();

router.get("/", anggotaController.getAllAnggota);
router.get("/:id", anggotaController.getAnggotaById);
router.post("/", anggotaController.createAnggota);
router.put("/:id", anggotaController.updateAnggota);
router.delete("/:id", anggotaController.deleteAnggota);

export default router;
