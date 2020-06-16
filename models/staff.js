const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Staff = new Schema({
  Name: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Email: {
    type: String,
  },
  Address: {
    type: String,
  },
  Specialisation: {
    type: String,
  },
});
module.exports = User = mongoose.model("Staff", Staff);
