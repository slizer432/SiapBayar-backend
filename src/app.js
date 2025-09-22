const express = require("express");
const prisma = require("./lib/prisma");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
