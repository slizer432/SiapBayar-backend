import { Router } from "express";
import * as pembayaranPengeluaranController from "./pembayaranPengeluaran.controller.js";

const router = Router();

router.get("/", pembayaranPengeluaranController.getAllPembayaranPengeluaran);
router.get(
  "/:id",
  pembayaranPengeluaranController.getPembayaranPengeluaranById
);
router.post("/", pembayaranPengeluaranController.createPembayaranPengeluaran);
router.put("/:id", pembayaranPengeluaranController.updatePembayaranPengeluaran);
router.delete(
  "/:id",
  pembayaranPengeluaranController.deletePembayaranPengeluaran
);

export default router;
