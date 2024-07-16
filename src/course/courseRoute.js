const express = require('express');
const router = express.Router();
const courseController = require('../course/courseController');
    

// Ruta para crear un nuevo aprendiz
router.post('/cursos/create', courseController.createCourse);

// Ruta para obtener todos los aprendices
router.get('/cursos', courseController.getAllCourses);

// Ruta para obtener un aprendiz por su ID
router.get('/cursos/:id',courseController.getCourseById);


// Ruta para actualizar un aprendiz existente
router.put('/cursos/:id', courseController.updateCourse);

// Ruta para eliminar un aprendiz
router.delete('/cursos/:id', courseController.deleteCourse);

module.exports = router;
