const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrentJobs = new Schema({
  JobID: {
    type: String,
  },
  JobTitle: {
    type: String,
  },
  Staff: {
    StaffID: {
      type: String,
    },
    StaffName: {
      type: String,
    },
  },
  clientID: {
    type: String,
  },
  clientName: {
    type: String,
  },
  CompanyName: {
    type: String,
  },
  Days: {
    type: String,
  },
  CheckIn: {
    type: String,
  },
  CheckOut: {
    type: String,
  },
});
module.exports = User = mongoose.model("CurrentJobs", CurrentJobs);
