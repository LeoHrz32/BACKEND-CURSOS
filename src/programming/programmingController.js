const Programming = require('./programmingModel');
const Course = require('../course/courseModel');
const Instructor = require('../instructor/instructorModel');
const Apprentice = require('../apprentice/apprenticeModel');

// Crear una nueva programación
exports.createProgramming = async (req, res) => {
    try {
        const { state, courseId, instructorId, startDate, endDate } = req.body;

        const newProgramming = new Programming({
            state,
            courseId,
            instructorId,
            startDate,
            endDate,
            apprentices: [],
            attendanceDates: []
        });

        await newProgramming.save();
        res.status(201).json(newProgramming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las programaciones
exports.getAllProgrammings = async (req, res) => {
    try {
        const programmings = await Programming.find().populate('courseId instructorId apprentices');
        res.status(200).json(programmings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una programación por ID
exports.getProgrammingById = async (req, res) => {
    try {
        const { id } = req.params;
        const programming = await Programming.findById(id).populate('courseId instructorId apprentices');
        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }
        res.status(200).json(programming);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una programación por ID
exports.updateProgrammingById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const programming = await Programming.findByIdAndUpdate(id, updateData, { new: true });

        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }

        res.status(200).json(programming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una programación por ID
exports.deleteProgrammingById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProgramming = await Programming.findByIdAndDelete(id);
        if (!deletedProgramming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }
        res.status(200).json({ message: 'Programación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar aprendices a una programación existente
exports.addApprenticesToProgramming = async (req, res) => {
    try {
        const { id } = req.params;
        const { apprentices } = req.body;

        const programming = await Programming.findById(id);

        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }

        // Usar `addToSet` para agregar aprendices sin duplicados
        programming.apprentices.addToSet(...apprentices);

        const updatedProgramming = await programming.save();
        res.status(200).json(updatedProgramming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar aprendices de una programación existente
exports.removeApprenticesFromProgramming = async (req, res) => {
    try {
        const { id } = req.params;
        const { apprentices } = req.body;

        const programming = await Programming.findById(id);

        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }

        // Filtrar y actualizar el array de aprendices
        programming.apprentices = programming.apprentices.filter(appr => !apprentices.includes(appr.toString()));

        const updatedProgramming = await programming.save();
        res.status(200).json(updatedProgramming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar aprendices de una programación existente
exports.updateApprenticesInProgramming = async (req, res) => {
    try {
        const { id } = req.params;
        const { apprentices } = req.body;

        const programming = await Programming.findById(id);

        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }

        // Actualizar el array de aprendices
        programming.apprentices = apprentices;

        const updatedProgramming = await programming.save();
        res.status(200).json(updatedProgramming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Agregar fechas de asistencia a una programación existente
exports.addAttendanceDates = async (req, res) => {
    try {
        const { id } = req.params;
        const { attendanceDates } = req.body;

        const programming = await Programming.findById(id);

        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }

        attendanceDates.forEach(date => {
            programming.attendanceDates.push({ date, attendees: [] });
        });

        const updatedProgramming = await programming.save();
        res.status(200).json(updatedProgramming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar fechas de asistencia de una programación existente
exports.updateAttendanceDates = async (req, res) => {
    try {
        const { id } = req.params;
        const { attendanceDates } = req.body;

        const programming = await Programming.findById(id);

        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }

        // Actualizar el array de fechas de asistencia
        programming.attendanceDates = attendanceDates.map(date => ({ date, attendees: [] }));

        const updatedProgramming = await programming.save();
        res.status(200).json(updatedProgramming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una fecha de asistencia de una programación
exports.removeAttendanceDate = async (req, res) => {
    const { id, date } = req.params;

    try {
        let programming = await Programming.findById(id);

        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }

        programming.attendanceDates = programming.attendanceDates.filter(d => d.date.toISOString() !== date);

        await programming.save();

        return res.json(programming);
    } catch (error) {
        console.error('Error al eliminar la fecha de asistencia:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Tomar asistencia por fecha
exports.takeAttendanceByDate = async (req, res) => {
    const { id, date } = req.params;
    const { attendees } = req.body;

    try {
        let programming = await Programming.findById(id);

        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }

        const attendanceDate = programming.attendanceDates.find(d => d.date.toISOString() === date);

        if (!attendanceDate) {
            return res.status(404).json({ error: 'Fecha de asistencia no encontrada' });
        }

        attendanceDate.attendees = attendees;

        await programming.save();

        return res.json(programming);
    } catch (error) {
        console.error('Error al tomar la asistencia:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


exports.updateAttendanceByDate = async (req, res) => {
    try {
        const { id, date } = req.params;
        const { attendees } = req.body;

        // Encuentra la programación por ID
        const programming = await Programming.findById(id);
        if (!programming) {
            return res.status(404).json({ message: 'Programming not found' });
        }

        // Encuentra la fecha de asistencia en la programación
        const attendanceDate = programming.attendanceDates.find(att => att.date.toISOString() === new Date(date).toISOString());
        if (!attendanceDate) {
            return res.status(404).json({ message: 'Attendance date not found' });
        }

        // Actualiza la lista de aprendices que asistieron en esa fecha
        attendanceDate.attendees = attendees;

        // Guarda la programación actualizada
        await programming.save();

        res.status(200).json({ message: 'Attendance updated successfully', programming });
    } catch (error) {
        res.status(500).json({ message: 'Error updating attendance', error });
    }
};