const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Faculty = new Schema({
  Name: {
    type: String,
  },
  Department: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
});
module.exports = User = mongoose.model("Faculty", Faculty);
