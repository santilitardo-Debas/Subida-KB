const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Configuración de Multer para guardar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Ruta para subir archivos
app.post("/upload", upload.single("archivo"), (req, res) => {
  console.log("Subido por:", req.body.nombre);
  res.send("<h2>✅ Archivo subido con éxito</h2><a href='/'>Volver</a>");
});

// Listar archivos
app.get("/files", (req, res) => {
  fs.readdir("uploads/", (err, files) => {
    if (err) return res.status(500).json({ error: "No se pudieron listar" });
    res.json(files);
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
const path = require("path");

// ...

app.get("/admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});