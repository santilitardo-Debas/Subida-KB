const express = require("express");
const path = require("path");

const app = express();

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (carpeta public)
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // si tenés index.html
  // Si no, podés usar: res.send("Servidor funcionando 🚀");
});

// Puerto dinámico para Render o 3000 local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
