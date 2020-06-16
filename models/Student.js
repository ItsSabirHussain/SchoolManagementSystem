const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
  Name: {
    type: String,
  },
  FatherName: {
    type: String,
  },
  Address: {
    type: String,
  },
  Phone: {
    type: String,
  },
  DOB: {
    type: String,
  },
  Department: {
    type: String,
  },
  Class: {
    type: String,
  },
  Email: {
    type: String,
  },
  EnrolDate: {
    type: String,
  },
  Gender: {
    type: String,
  },
  Password: {
    type: String,
  },
});
module.exports = User = mongoose.model("Student", Student);
