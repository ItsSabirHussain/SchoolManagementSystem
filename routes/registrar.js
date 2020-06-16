const express = require("express");
const router = express.Router();

// Importing database models
const Subject = require("../models/Subject");
const Schedule = require("../models/Schedule");
const Facutly = require("../models/Faculty");

/* Add subject route */
router.post("/addsubject", (req, res) => {
  console.log(req.body.Faculty);
  const newSubject = new Subject({
    Name: req.body.Name,
    Code: req.body.Code,
    Department: req.body.Department,
    Class: req.body.Class,
    Faculty: req.body.Faculty,
  });
  newSubject
    .save()
    .then((subject) => res.json(subject))
    .catch((err) => console.log(err));
});

/* All subject details route */
router.post("/allsubjects", (req, res) => {
  Subject.find({}).then((subject) => {
    if (!subject) {
      res.status(404).json({ Message: "Record not found!" });
    }
    res.json(subject);
  });
});

/* Delete subject route */
router.post("/delsubject", (req, res) => {
  Subject.remove({ _id: req.body.id }, function (err, obj) {
    if (err) res.json({ Message: err });
    res.json({ Message: obj });
  });
});

/* Update subject route */
router.post("/updatesubject", (req, res) => {
  Subject.updateOne(
    { id: req.body._id },
    {
      Name: req.body.Name,
      Code: req.body.Code,
      Department: req.body.Department,
      Class: req.body.Class,
      Facutly: req.body.Facutly,
    },
    function (err, r) {
      if (err) {
        res.json({ Message: "Subject not found." });
      } else res.json({ Message: "Subject updated successfully" });
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
