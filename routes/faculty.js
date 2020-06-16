const express = require("express");
const router = express.Router();
const EnrolledSubject = require("../models/enrolledSubjects");
const Faculty = require("../models/Faculty");
const FeeAid = require("../models/FeeAid");

/* Add student route */
router.post("/addgrade", (req, res) => {
  EnrolledSubject.updateOne(
    { StudentID: req.body.StudentID, Code: req.body.Code },
    {
      Marks: req.body.Marks,
      Obtained: req.body.Obtained,
      Grade: req.body.Grade,
    },
    function (err, r) {
      if (err) {
        res.json({ Message: "Student not found." });
      } else res.json({ Message: "Student updated successfully" });
    }
  );
});

/* All student details route */
router.post("/allgrades", (req, res) => {
  EnrolledSubject.find({}).then((Student) => {
    if (!Student) {
      res.status(404).json("Record not found!");
    }
    res.json(Student);
  });
});

router.post("/faculty", (req, res) => {
  Faculty.findOne({ _id: req.body.id }).then((student) => {
    if (student) {
      res.json(student);
    } else {
      res.status(404).json("Not found");
    }
  });
});

/* Update student route */
router.post("/updategrade", (req, res) => {
  EnrolledSubject.updateOne(
    { _id: req.body.id },
    {
      Marks: req.body.Marks,
      Obtained: req.body.Obtained,
      Grade: req.body.Grade,
    },
    function (err, r) {
      if (err) {
        res.json({ Message: "Student not found." });
      } else res.json({ Message: "Student updated successfully" });
    }
  );
});

/* Client login route */
router.post("/login", (req, res) => {
  Faculty.findOne({ Email: req.body.Email }).then((student) => {
    if (student) {
      if (student.Password === req.body.Password) {
        res.json({ ID: student._id });
      }
    } else {
      res.status(404).json("Not found");
    }
  });
});

module.exports = router;
