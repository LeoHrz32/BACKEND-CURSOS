const Course = require('../course/courseModel'); // Reemplaza la ruta con la ubicación real de tu modelo Course

// Obtener todos los cursos
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo curso
exports.createCourse = async (req, res) => {
    const course = new Course({
        name: req.body.name,
        description: req.body.description,
        time: req.body.time,
        state: req.body.state,
        assigned: req.body.assigned
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtener un curso por ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Curso no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar un curso por ID
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Curso no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Eliminar un curso por ID
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (course) {
            res.json({ message: 'Curso eliminado' });
        } else {
            res.status(404).json({ message: 'Curso no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
