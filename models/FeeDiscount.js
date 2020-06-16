const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeeDiscount = new Schema({
  StudentID: {
    type: String,
  },
  Discount: {
    type: Number,
  },
});
module.exports = User = mongoose.model("FeeDiscount", FeeDiscount);
