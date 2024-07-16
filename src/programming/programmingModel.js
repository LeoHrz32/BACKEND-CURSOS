const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    date: { type: Date, required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'Apprentice' }],
});

const programmingSchema = new Schema({
    state: {
        type: String,
        required: true,
        enum: ['Disponible', 'En proceso', 'Cancelado', 'Finalizado']
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    apprentices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apprentice'
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    attendanceDates: [attendanceSchema]
}, { timestamps: true });

const Programming = mongoose.model('Programming', programmingSchema);

module.exports = Programming;
