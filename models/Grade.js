const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  coursecode:{
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: false,
    max: 5,
    min: 0,
  },
});

module.exports = GradeSchema;
