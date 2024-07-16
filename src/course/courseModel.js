const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo nombre']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es requerida'],
        trim: true
    },
    time: { 
        type: Number,
        required: [true, 'El campo de tiempo del curso es requerido'],
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value);
            },
            message: 'El tiempo debe contener solo números positivos'
        }
    },
    state: {
        type: String,
        required: true,
        enum: ['Disponible', 'No disponible'],
        default: 'No disponible'
    },
    assigned: {
        type: Boolean,
        required: true,
        default: false 
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema); // Nombre de modelo corregido

module.exports = Course;
