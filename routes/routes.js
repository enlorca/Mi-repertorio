const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

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

/* GET / (servir el HTML) */
router.get("/", (req, res) => {
  console.log("Solicitud recibida para /");
  const indexPath = path.join(__dirname, "../index.html");
  try {
    const indexHtml = fs.readFileSync(indexPath, "utf-8");

    res.header("Content-Type", "text/html");

    res.send(indexHtml);
    console.log("Respuesta enviada correctamente");
  } catch (error) {
    console.error("Error leyendo index.html:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* POST /canciones */
router.post("/canciones", (req, res) => {
  const repertorio = getRepertorio();
  const nuevaCancion = req.body;

  repertorio.push(nuevaCancion);
  writeRepertorio(repertorio);

  res.json({
    message: "Canción agregada correctamente",
    cancion: nuevaCancion,
  });
});

/* PUT /canciones/:id */
router.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancionActualizada = req.body;
  const repertorio = getRepertorio();
  const index = repertorio.findIndex((cancion) => cancion.id == id);
  repertorio[index] = cancionActualizada;
  writeRepertorio(repertorio);
  console.log(repertorio);
  res.json({
    message: "Canción actualizada correctamente",
    cancion: cancionActualizada,
  });
});

/* DELETE /canciones/:id */
router.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const repertorio = getRepertorio();
  const index = repertorio.findIndex((cancion) => cancion.id === id);
  repertorio.splice(index, 1);
  writeRepertorio(repertorio);
  res.json({ message: "Canción eliminada correctamente" });
});

module.exports = router;
