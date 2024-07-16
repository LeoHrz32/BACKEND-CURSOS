const Apprentice = require('../apprentice/apprenticeModel');

// Crear un nuevo aprendiz
exports.createApprentice = async (req, res) => {
    try {
        const { documentNumber } = req.body;
        const apprenticeExistente = await Apprentice.findOne({ documentNumber });

        if (apprenticeExistente) {
            return res.status(400).send({ message: 'El número de cédula ya está en uso' });
        }

        const apprentice = new Apprentice(req.body);
        await apprentice.save();
        res.status(201).send(apprentice);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Obtener todos los aprendices
exports.getAllApprentices = async (req, res) => {
    try {
        const apprentices = await Apprentice.find();
        res.status(200).send(apprentices);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Obtener un aprendiz por ID
exports.getApprenticeById = async (req, res) => {
    try {
        const apprentice = await Apprentice.findById(req.params.id);

        if (!apprentice) {
            return res.status(404).send({ message: 'Aprendiz no encontrado' });
        }
        res.status(200).send(apprentice);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Actualizar un aprendiz por ID
exports.updateApprentice = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['firstName', 'lastName','location', 'documentType', 'documentNumber', 'phoneNumber', 'isAvailable'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ message: 'Actualización no permitida' });
        }

        // Validar que el nuevo número de cédula no esté en uso
        if (req.body.documentNumber) {
            const apprenticeExistente = await Apprentice.findOne({ documentNumber: req.body.documentNumber });
            if (apprenticeExistente && apprenticeExistente._id.toString() !== req.params.id) {
                return res.status(400).send({ message: 'El número de cédula ya está en uso' });
            }
        }

        const apprentice = await Apprentice.findById(req.params.id);
        if (!apprentice) {
            return res.status(404).send({ message: 'Aprendiz no encontrado' });
        }

        updates.forEach(update => apprentice[update] = req.body[update]);
        await apprentice.save();

        res.status(200).send(apprentice);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Eliminar un aprendiz por ID
exports.deleteApprentice = async (req, res) => {
    try {
        const apprentice = await Apprentice.findByIdAndDelete(req.params.id);
        if (!apprentice) {
            return res.status(404).send({ message: 'Aprendiz no encontrado' });
        }
        res.status(200).send({ message: 'Aprendiz eliminado' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
