const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  schoolingLevel: {
    type: String,
    required: true,
  },
  parentGuardian: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  additionalComments: {
    type: String,
  }
});

const Student = model("Student", studentSchema);

module.exports = Student;
