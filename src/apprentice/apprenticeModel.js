const mongoose = require('mongoose');

const apprenticeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo nombre']
    },
    lastName: {
        type: String,
        required: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo nombre']
    },
    location: {
        type: String,
        required: true,
    },
    documentType: {
        type: String,
        required: true,
        enum: {
            values: ['Cedula', 'Tarjeta de identidad','Cedula Extranjera'],
            message: '{VALUE} no es un tipo de documento válido'
        }
    },
    documentNumber: {
        type: Number,
        required: true,
        unique: true,// Asegura que el número de documento sea único
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value);
            },
            message: 'La cédula debe contener solo números'
        }
    },
    phoneNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
              return /^\d{7,14}$/.test(value); 
            },
            message: 'El teléfono debe contener entre 7 y 14 dígitos numéricos',
          }
    },
    isAvailable: {
        type: String,
        required : true,
        enum: ['Disponible','No disponible']
      }
}, { timestamps: true });

const Apprentice = mongoose.model('Apprentice', apprenticeSchema);

module.exports = Apprentice;
