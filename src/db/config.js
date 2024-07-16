const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Conexion exitosa a la base de datos');
    } catch (error) {

        console.log('Error al conectarse con la base de datos: ', error);
        process.exit(1);

    }
}
module.exports = connectDB;
