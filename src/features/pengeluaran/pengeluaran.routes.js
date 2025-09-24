import { Router } from "express";
import * as pengeluaranController from "./pengeluaran.controller.js";

const router = Router();

router.get("/", pengeluaranController.getAllPengeluaran);
router.get("/:id", pengeluaranController.getPengeluaranById);
router.post("/", pengeluaranController.createPengeluaran);
router.put("/:id", pengeluaranController.updatePengeluaran);
router.delete("/:id", pengeluaranController.deletePengeluaran);

export default router;
