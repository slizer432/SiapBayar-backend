// app.js

import express from "express";
import kelompokRoutes from "./features/kelompok/kelompok.routes.js";
import allDataRoutes from "./features/allData.routes.js";
import anggotaRoutes from "./features/anggota/anggota.routes.js";
import pengeluaranRoutes from "./features/pengeluaran/pengeluaran.routes.js";
import jatahUrunanRoutes from "./features/jatahUrunan/jatahUrunan.routes.js";
import pembayaranPengeluaranRoutes from "./features/pembayaranPengeluaran/pembayaranPengeluaran.routes.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/api/kelompok", kelompokRoutes);
app.use("/api/all-data", allDataRoutes);
app.use("/api/anggota", anggotaRoutes);
app.use("/api/pengeluaran", pengeluaranRoutes);
app.use("/api/jatah-urunan", jatahUrunanRoutes);
app.use("/api/pembayaran-pengeluaran", pembayaranPengeluaranRoutes);

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
