const mongoose = require("mongoose");

const validator = require("validator");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already present"],
    validate(value) {
      if (validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
