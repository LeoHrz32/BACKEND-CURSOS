const express = require('express');
const router = express.Router();
const programmingController = require('./programmingController');

router.post('/create', programmingController.createProgramming);
router.get('/', programmingController.getAllProgramming);
router.get('/:id', programmingController.getProgramming);
router.put('/:id', programmingController.updateProgramming);
router.delete('/:id', programmingController.deleteProgramming);
router.put('/:id', programmingController.addAttendance);

module.exports = router;