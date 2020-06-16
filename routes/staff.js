const express = require("express");
const router = express.Router();

const Staff = require("../models/staff");
const CurrentJobs = require("../models/CurrentJobs");
const Payment = require("../models/payment");
const Attendance = require("../models/attendance");

/* Staff details */
router.post("/staffdetails", (req, res) => {
  Staff.find({ id: req.body.id }).then((staff) => {
    if (!staff) {
      return res.status(404).json({ Message: "Staff not found!" });
    }
    res.json(staff);
  });
});

/* Current jobs */
router.post("/currentjobs", (req, res) => {
  CurrentJobs.find({ Staff: { StaffID: req.body.StaffID } }).then((jobs) => {
    if (!staff) {
      return res.status(404).json({ Message: "Jobs not found!" });
    }
    res.json(jobs);
  });
});

/* Attendance */
router.post("/checkinattendance", (req, res) => {
  const newAttendance = new Attendance({
    staffID: req.body.staffID,
    staffName: req.body.staffName,
    jobID: req.body.jobID,
    jobName: req.body.jobName,
    Date: Date(),
    checkIn: Date(),
    checkOut: Date(),
  });
  newAttendance.save().then((attendance) => {
    return res.json(attendance);
  });
});

/* Attendance */
router.post("/checkoutattendance", (req, res) => {
  Attendance.updateOne(
    { staffID: req.staffID, jobID: req.body.jobID, Date: Date() },
    { checkOut: Date() },
    function (err, res) {
      if (err) {
        return res.json({ Message: "User did not checkin." });
      } else
        return res.json({ Message: "User attendance updated successfully" });
    }
  );
});
/* Payments */
router.post("/currentjobs", (req, res) => {
  Payment.find({ Conern: "Staff", StaffID: req.body.StaffID }).then((jobs) => {
    if (!staff) {
      return res.status(404).json({ Message: "Jobs not found!" });
    }
    res.json(jobs);
  });
});
module.exports = router;
