const express = require('express');
const router = express.Router();
const programmingController = require('./programmingController');

// Crear una nueva programación
router.post('/programacion/create', programmingController.createProgramming);

// Obtener todas las programaciones
router.get('/programacion', programmingController.getAllProgrammings);

// Obtener una programación por ID
router.get('/programacion/:id', programmingController.getProgrammingById);

// Actualizar una programación por ID
router.put('/programacion/:id', programmingController.updateProgrammingById);

// Eliminar una programación por ID
router.delete('/programacion/:id', programmingController.deleteProgrammingById);

// Agregar aprendices a una programación existente
router.put('/programacion/addApprentices/:id', programmingController.addApprenticesToProgramming);

// Eliminar aprendices de una programación existente
router.put('/programacion/removeApprentices/:id', programmingController.removeApprenticesFromProgramming);

// Actualizar aprendices en una programación existente
router.put('/programacion/updateApprentices/:id', programmingController.updateApprenticesInProgramming);

// Agregar fechas de asistencia a una programación existente
router.put('/programacion/add-attendance-dates/:id', programmingController.addAttendanceDates);

// Actualizar fechas de asistencia de una programación existente
router.put('/programacion/update-attendance-dates/:id', programmingController.updateAttendanceDates);

// Eliminar una fecha de asistencia de una programación existente
router.put('/programacion/remove-attendance-date/:id/:date', programmingController.removeAttendanceDate);

// Tomar asistencia por fecha
router.put('/programacion/take-attendance/:id/:date', programmingController.takeAttendanceByDate);

// Actualizar la lista de aprendices que asistieron en una fecha de asistencia
router.put('/programacion/update-attendance/:id/:date', programmingController.updateAttendanceByDate);

module.exports = router;
