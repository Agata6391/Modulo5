// models/libro.js
const mongoose = require('mongoose');

// Esquema de Mongoose para los libros
const libroSchema = new mongoose.Schema({
  nombre: String,
  autor: String,
  isbn: String,
  imagen: String,
  publicacion: String,
  cantidadDisponible: Number,
  genero: String,
});

// Exportar el modelo "Libro"
module.exports = mongoose.model('Libro', libroSchema);
