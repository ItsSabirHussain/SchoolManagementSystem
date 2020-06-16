const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notification = new Schema({
  Date: {
    type: Date,
  },
  Message: {
    type: String,
  },
});
module.exports = User = mongoose.model("Notification", Notification);
