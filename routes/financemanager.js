const express = require("express");
const router = express.Router();

// Importing database models
const Notification = require("../models/Notification");
const FeeDiscount = require("../models/FeeDiscount");
const FeeAid = require("../models/FeeAid");

const Schedule = require("../models/Schedule");
const Facutly = require("../models/Faculty");

/* Add subject route */
router.post("/feereminder", (req, res) => {
  const newNotification = new Notification({
    Date: Date(),
    Message: req.body.Message,
  });
  newNotification
    .save()
    .then((subject) => res.json(subject))
    .catch((err) => console.log(err));
});

router.post("/providefeediscount", (req, res) => {
  const newFeeDiscount = new FeeDiscount({
    StudentID: req.body.StudentID,
    Discount: req.body.Discount,
  });
  newFeeDiscount
    .save()
    .then((subject) => res.json(subject))
    .catch((err) => console.log(err));
});

/* All subject details route */
router.post("/allfees", (req, res) => {
  FeeAid.find({}).then((subject) => {
    if (!subject) {
      res.status(404).json({ Message: "Record not found!" });
    }
    res.json(subject);
  });
});

/* All subject details route */
router.post("/report", (req, res) => {
  FeeAid.find({ Department: req.body.Department }).then((subject) => {
    if (!subject) {
      res.status(404).json({ Message: "Record not found!" });
    }
    var paid = 0;
    var total = 0;
    var aid = 0;
    subject.map((ee) => {
      paid = paid + parseInt(ee.Paid, 10);
      total = total + parseInt(ee.TotalFee, 10);
      aid = aid + parseInt(ee.Aid, 10);
    });
    res.json({ Paid: paid, Total: total, Aid: aid });
  });
});

/* Update subject route */
router.post("/updatefee", (req, res) => {
  FeeAid.updateOne(
    { id: req.body._id },
    {
      Name: req.body.Name,
      StudentID: req.body.StudentID,
      Month: req.body.Month,
      Department: req.body.Department,
      TotalFee: req.body.TotalFee,
      Aid: req.body.Aid,
      Paid: req.body.Paid,
      Status: req.body.Status,
      Class: req.body.Class,
    },
    function (err, r) {
      if (err) {
        res.json({ Message: "Record not found." });
      } else res.json({ Message: "Record updated successfully" });
    }
  );
});

/* Add schedule route */
router.post("/addschedule", (req, res) => {
  const newSchedule = new Schedule({
    Name: req.body.Name,
    Code: req.body.Code,
    Department: req.body.Department,
    Class: req.body.Class,
    Faculty: req.body.Faculty,
    Day: req.body.Day,
    TimeSlot: req.body.TimeSlot,
  });
  newSchedule
    .save()
    .then((schedule) => res.json(schedule))
    .catch((err) => console.log(err));
});

/* All schedule details route */
router.post("/allschedules", (req, res) => {
  Schedule.find({}).then((subject) => {
    if (!subject) {
      res.status(404).json({ Message: "Record not found!" });
    }
    res.json(subject);
  });
});

/* Delete schedule route */
router.post("/delschedule", (req, res) => {
  Schedule.remove({ _id: req.body.id }, function (err, obj) {
    if (err) {
      res.json({ Message: err });
    }
    res.json({ Message: "Deleted Successfully." });
  });
});

/* Update schedule route */
router.post("/updateschedule", (req, res) => {
  console.log("Hewre");
  Schedule.updateOne(
    { id: req.body._id },
    {
      Name: req.body.Name,
      Code: req.body.Code,
      Department: req.body.Department,
      Class: req.body.Class,
      Faculty: req.body.Faculty,
      Day: req.body.Day,
      TimeSlot: req.body.TimeSlot,
    },
    function (err, r) {
      if (err) {
        res.json({ Message: "Schedule not found." });
      } else res.json({ Message: "Schedule updated successfully" });
    }
  );
});

/* All schedule details route */
router.post("/allfacutly", (req, res) => {
  Facutly.find({}).then((faculty) => {
    if (!faculty) {
      res.status(404).json({ Message: "Record not found!" });
    }
    res.json(faculty);
  });
});

router.post("/addfacutly", (req, res) => {
  const newSubject = new Facutly({
    Name: req.body.Name,
    Email: req.body.Email,
    Department: req.body.Department,
    Password: req.body.Password,
  });
  newSubject
    .save()
    .then((subject) => res.json(subject))
    .catch((err) => console.log(err));
});

module.exports = router;
