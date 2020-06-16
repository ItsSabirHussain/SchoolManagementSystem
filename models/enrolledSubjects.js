const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnrolledSubjects = new Schema({
  Name: {
    type: String,
  },
  Code: {
    type: String,
  },
  Department: {
    type: String,
  },
  Class: {
    type: String,
  },
  Faculty: {
    type: String,
  },
  StudentID: {
    type: String,
  },
  Marks: {
    type: String,
  },
  Obtained: {
    type: String,
  },
  Grade: {
    type: String,
  },
});
module.exports = User = mongoose.model("EnrolledSubjects", EnrolledSubjects);
