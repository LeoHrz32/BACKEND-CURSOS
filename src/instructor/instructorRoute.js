const express = require('express');

const router = express.Router();

const instructorController = require('../instructor/instructorController');

//Ruta para agregar un instructor
router.post('/instructores/create',instructorController.createInstructor) 

//Ruta para listar todos los instructores
router.get('/instructores',instructorController.getAllInstructors)

//Ruta para listar por ID
router.get('/instructores/:id',instructorController.getInstructorById)


router.put('/instructores/:id', instructorController.updateInstructor)


router.delete('/instructores/:id',instructorController.deleteInstructor)


module.exports = router;