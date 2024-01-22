const express = require("express");
const router = express.Router();
const fs = require("fs");

const repertorioRuta = "./src/data/repertorio.json";

/* Middleware para leer repertorio.json */
function getRepertorio() {
  const repertorioData = fs.readFileSync(repertorioRuta, "utf-8");
  return JSON.parse(repertorioData);
}

/* Middleware para escribir en repertorio.json */
function writeRepertorio(data) {
  fs.writeFileSync(repertorioRuta, JSON.stringify(data, null, 2), "utf-8");
}

/* GET /canciones */
router.get("/canciones", (req, res) => {
  const repertorio = getRepertorio();
  res.json(repertorio);
});

/* POST /canciones */
router.post("/canciones", (req, res) => {
  const repertorio = getRepertorio();
  const nuevaCancion = req.body;

  repertorio.push(nuevaCancion);
  writeRepertorio(repertorio);

  res.json({ message: "Canción agregada correctamente", cancion: nuevaCancion });
});


module.exports = router;
