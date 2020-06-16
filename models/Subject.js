const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subject = new Schema({
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
  Faculty: {},
});
module.exports = User = mongoose.model("Subject", Subject);
