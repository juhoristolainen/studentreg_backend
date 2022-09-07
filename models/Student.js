const mongoose = require('mongoose');
const GradeSchema = require('./Grade');

const StudentSchema = new mongoose.Schema({
  studentcode: {
    type: String,
    unique: true,
    required: true,
    match: /^[A-Z]{1}[0-9]{4}$/,
  },
  name: {
    type: String,
    required: true,
    max: 80,
  },
  email: {
    type: String,
    required: true,
  },
  studypoints: {
    type: Number,
    min: 0,
    max: 300,
    required: false,
  },
  grades: { type: [GradeSchema], required: true },
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
