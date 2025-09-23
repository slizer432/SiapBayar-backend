// app.js

import express from "express";
import kelompokRoutes from "./features/kelompok/kelompok.routes.js"; // Ganti jadi import

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/kelompok", kelompokRoutes); // Baris ini sekarang akan berfungsi dengan benar

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
