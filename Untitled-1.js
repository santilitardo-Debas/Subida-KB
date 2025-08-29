const express = require('express');
const multer = require('multer');
const path = require('path');
const serveIndex = require('serve-index');

const app = express();
const PORT = 3000;

// === Configuración de multer ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// === Middleware para servir y listar archivos ===
app.use('/uploads', 
  express.static(path.join(__dirname, 'uploads')),
  serveIndex(path.join(__dirname, 'uploads'), { icons: true })
);

// === Ruta de inicio ===
app.get('/', (req, res) => {
  res.send('<h1>Servidor funcionando 🚀</h1><a href="/uploads/">Ver archivos subidos</a>');
});

// === Subir archivo ===
app.post('/upload', upload.single('file'), (req, res) => {
  res.send(`Archivo subido: <a href="/uploads/${req.file.filename}">${req.file.filename}</a>`);
});

// === Iniciar servidor ===
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
