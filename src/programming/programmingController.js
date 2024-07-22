const Programming = require('./programmingModel');
const Course = require('../course/courseModel');
const Instructor = require('../instructor/instructorModel');
const Apprentice = require('../apprentice/apprenticeModel');

exports.createProgramming = async (req, res) => {
    try {
        const { state, courseId, instructorId, apprentices, startDate, endDate, attendanceDates } = req.body;
        const programming = new Programming({
            state,
            courseId,
            instructorId,
            apprentices,
            startDate,
            endDate,
            attendanceDates
        });
        await programming.save();
        res.status(201).json(programming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllProgramming = async (req, res) => {
    try {
        const programmings = await Programming.find()
            .populate('courseId')
            .populate('instructorId')
            .populate('apprentices')
            .populate('attendanceDates.attendees');
        
        if (programmings.length === 0) {
            return res.status(404).json({ message: 'No se encontraron programaciones' });
        }

        res.status(200).json(programmings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getProgramming = async (req, res) => {
    try {
        const { id } = req.params;
        const programming = await Programming.findById(id) 
            .populate('courseId')
            .populate('instructorId')
            .populate('apprentices') 
            .populate('attendanceDates.attendees');
            
        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }

        res.status(200).json(programming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateProgramming = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const programming = await Programming.findById(id);
        if (!programming) {
            return res.status(404).json({ error: 'Programming not found' });
        }

        if (updates.state) programming.state = updates.state;
        if (updates.courseId) programming.courseId = updates.courseId;
        if (updates.instructorId) programming.instructorId = updates.instructorId;
        if (updates.apprentices) programming.apprentices = updates.apprentices;
        if (updates.startDate) programming.startDate = updates.startDate;
        if (updates.endDate) programming.endDate = updates.endDate;

        if (updates.attendanceDates) {
            updates.attendanceDates.forEach(attendanceUpdate => {
                const existingAttendance = programming.attendanceDates.find(
                    attendance => attendance.date.toISOString() === new Date(attendanceUpdate.date).toISOString()
                );
                if (existingAttendance) {
                    existingAttendance.attendees = attendanceUpdate.attendees;
                } else {
                    programming.attendanceDates.push(attendanceUpdate);
                }
            });
        }

        await programming.save();
        res.status(200).json(programming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProgramming = async (req, res) => {
    try {
        const { id } = req.params;
        await Programming.findByIdAndDelete(id);
        
        res.status(200).json({ message: 'Programming deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { attendanceDate, attendees } = req.body;

        const programming = await Programming.findById(id);
        if (!programming) {
            return res.status(404).json({ error: 'Programming not found' });
        }

        // Verificar si la fecha de asistencia ya existe en la lista
        let attendanceToUpdate = programming.attendanceDates.find(date => 
            date.date.toISOString() === new Date(attendanceDate).toISOString()
        );

        // Si no existe, crear una nueva entrada para esa fecha
        if (!attendanceToUpdate) {
            attendanceToUpdate = {
                date: new Date(attendanceDate),
                attendees: []
            };
            programming.attendanceDates.push(attendanceToUpdate);
        }

        // Agregar nuevos asistentes sin duplicados
        attendees.forEach(attendeeId => {
            if (!attendanceToUpdate.attendees.includes(attendeeId)) {
                attendanceToUpdate.attendees.push(attendeeId);
            }
        });

        await programming.save();

        res.status(200).json(programming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};