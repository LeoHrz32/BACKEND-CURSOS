const express = require('express');
const router = express.Router();
const apprenticeController = require('../apprentice/apprenticeController');


// Ruta para crear un nuevo aprendiz
router.post('/aprendices/create', apprenticeController.createApprentice);

// Ruta para obtener todos los aprendices
router.get('/aprendices', apprenticeController.getAllApprentices);

// Ruta para obtener un aprendiz por su ID
router.get('/aprendices/:id', apprenticeController.getApprenticeById);

// Ruta para actualizar un aprendiz existente
router.put('/aprendices/:id', apprenticeController.updateApprentice);

// Ruta para eliminar un aprendiz
router.delete('/aprendices/:id', apprenticeController.deleteApprentice);

module.exports = router;