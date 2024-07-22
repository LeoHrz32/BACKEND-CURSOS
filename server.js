if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./src/db/config');
const bodyparser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(cors());
connectDB();

// Importar y registrar todos los modelos aquí
require('./src/course/courseModel');
require('./src/instructor/instructorModel');
require('./src/apprentice/apprenticeModel');
require('./src/programming/programmingModel'); // Asegúrate de que esta ruta sea correcta

app.get('/', (req, res) => {
  res.send('API Gateway');
});

// Importar y usar las rutas después de registrar los modelos
const routeInstructor = require('./src/instructor/instructorRoute');
app.use('/fepi', routeInstructor);

const routeApprentice = require('./src/apprentice/apprenticeRoute');
app.use('/fepi', routeApprentice);

const routeCourse = require('./src/course/courseRoute');
app.use('/fepi', routeCourse);

const routeProgramming = require('./src/programming/programmingRoute');
app.use('/fepi/programming', routeProgramming);


app.listen(PORT, () => {
  console.log(`API Gateway escuchando en el puerto ${PORT}`);
});
