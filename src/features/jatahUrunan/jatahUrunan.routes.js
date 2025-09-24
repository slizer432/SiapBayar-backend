import { Router } from "express";
import * as jatahUrunanController from "./jatahUrunan.controller.js";

const router = Router();

router.get("/", jatahUrunanController.getAllJatahUrunan);
router.get("/:id", jatahUrunanController.getJatahUrunanById);
router.post("/", jatahUrunanController.createJatahUrunan);
router.put("/:id", jatahUrunanController.updateJatahUrunan);
router.delete("/:id", jatahUrunanController.deleteJatahUrunan);

export default router;
