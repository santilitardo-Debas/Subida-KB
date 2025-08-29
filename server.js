const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configuración de Multer (subidas)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Ruta principal (formulario)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para manejar la subida
app.post("/upload", upload.single("archivo"), (req, res) => {
  if (!req.file) {
    return res.send("Error: No se subió ningún archivo.");
  }

  res.send(`
    <h2>Archivo subido con éxito ✅</h2>
    <p><a href="/uploads/${req.file.filename}" target="_blank">📂 Ver archivo</a></p>
    <p><a href="/">↩️ Volver</a></p>
    <p><a href="/admin">⚙️ Ir al panel de administración</a></p>
  `);
});

// Panel de administración
app.get("/admin", (req, res) => {
  const uploadDir = path.join(__dirname, "uploads");

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.send("Error leyendo archivos.");
    }

    let html = "<h1>📂 Archivos subidos</h1><ul>";
    files.forEach(file => {
      html += `<li><a href="/uploads/${file}" target="_blank">${file}</a></li>`;
    });
    html += "</ul><a href='/'>⬅️ Volver</a>";

    res.send(html);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
