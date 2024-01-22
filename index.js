const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use("/canciones", routes);

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

/* Middleware para manejar data de repertorio.json */
app.use((req, res) => {
  req.repertorio = getRepertorio();
  res.on("finish", () => {
    writeRepertorio(req.repertorio);
  });
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
