const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeeAid = new Schema({
  StudentID: {
    type: String,
  },
  Name: {
    type: String,
  },
  Department: {
    type: String,
  },
  Class: {
    type: String,
  },
  TotalFee: {
    type: String,
  },
  Aid: {
    type: String,
  },
  Month: {
    type: String,
  },
  Paid: {
    type: String,
  },
  Status: {
    type: String,
  },
  Date: { type: String },
});
module.exports = User = mongoose.model("FeeAid", FeeAid);
