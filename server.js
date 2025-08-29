const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware para servir archivos estáticos (tu index.html en public)
app.use(express.static("public"));

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Ruta principal (para mostrar el index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para subir archivos
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No se subió ningún archivo.");
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.send(`
    <h2>Archivo subido con éxito ✅</h2>
    <p><a href="${fileUrl}" target="_blank">📂 Ver archivo</a></p>
    <p><a href="/">⬅️ Volver</a></p>
  `);
});

// Hacer accesible la carpeta de archivos subidos
app.use("/uploads", express.static("uploads"));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
