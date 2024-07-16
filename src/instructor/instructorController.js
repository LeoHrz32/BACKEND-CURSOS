const Instructor = require('../instructor/instructorModel');

// Crear un nuevo instructor
exports.createInstructor = async (req, res) => {
    try {


        const { documentNumber } = req.body;
        const instructorExistente = await Instructor.findOne({ documentNumber });

        if (instructorExistente) {
            return res.status(400).send({ message: 'El número de cédula ya está en uso' });
        }

        const instructor = new Instructor(req.body);
        
        await instructor.save();
        res.status(201).send(instructor);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Obtener todos los instructores
exports.getAllInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find();
        res.status(200).send(instructors);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Obtener un instructor por ID
exports.getInstructorById = async (req, res) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        if (!instructor) {
            return res.status(404).send({ message: 'Instructor no encontrado' });
        }
        res.status(200).send(instructor);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Actualizar un instructor por ID
exports.updateInstructor = async (req, res) => {
    try {

        
        const updates = Object.keys(req.body);
        const allowedUpdates = ['firstName', 'lastName','location', 'documentType','documentNumber', 'phoneNumber','profession','isAvailable','area','thematic'];


        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ message: 'Actualización no permitida' });
        }

        // Validar que el nuevo número de cédula no esté en uso
        if (req.body.documentNumber) {
            const instructorExistente = await Instructor.findOne({ documentNumber: req.body.documentNumber });
            if (instructorExistente && instructorExistente._id.toString() !== req.params.id) {
                return res.status(400).send({ message: 'El número de cédula ya está en uso' });
            }
        }

        const instructor = await Instructor.findById(req.params.id);
        if (!instructor) {
            return res.status(404).send({ message: 'Instructor no encontrado' });
        }

        updates.forEach(update => instructor[update] = req.body[update]);
        await instructor.save();

        res.status(200).send(instructor);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Eliminar un instructor por ID
exports.deleteInstructor = async (req, res) => {
    try {
        const instructor = await Instructor.findByIdAndDelete(req.params.id);
        if (!instructor) {
            return res.status(404).send({ message: 'Instructor no encontrado' });
        }
        res.status(200).send({ message: 'Instructor eliminado' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
