const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Schedule = new Schema({
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
  Day: {
    type: String,
  },
  TimeSlot: {
    type: String,
  },
});
module.exports = User = mongoose.model("Schedule", Schedule);
