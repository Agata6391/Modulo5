const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const librosRoutes = require('./Routes/Libros'); // Importar rutas de libros
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());  // Manejar JSON en las peticiones
app.use(cors());  // Habilitar CORS si es necesario

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/librosdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Rutas de libros
app.use('/api/libros', librosRoutes);  // Usar las rutas de libros para cualquier solicitud a /api/libros

// Servir el frontend (React) desde la carpeta build
app.use(express.static(path.join(__dirname, 'client/build')));

// Cualquier ruta desconocida servirá el frontend de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Middleware global de manejo de errores (opcional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
