const express = require("express");
const router = express.Router();
const FeeAid = require("../models/FeeAid");
const FeeDiscount = require("../models/FeeDiscount");

const Student = require("../models/Student");
const Schedule = require("../models/Schedule");
const Subject = require("../models/Subject");
const EnrolledSubject = require("../models/enrolledSubjects");

/* Add student route */
router.post("/login", (req, res) => {
  Student.findOne({ Email: req.body.Email }).then((student) => {
    if (student) {
      if (student.Password === req.body.Password) {
        res.json({ ID: student._id });
      }
    } else {
      res.status(404).json("Not found");
    }
  });
});

/* Add student route */
router.post("/student", (req, res) => {
  Student.findOne({ _id: req.body.id }).then((student) => {
    if (student) {
      res.json(student);
    } else {
      res.status(404).json("Not found");
    }
  });
});

/* All fee details route */
router.post("/availablesubjects", (req, res) => {
  Subject.find({ Department: req.body.Department, Class: req.body.Class }).then(
    (feeaid) => {
      if (!feeaid) {
        res.status(404).json({ Message: "Record not found!" });
      }
      res.json(feeaid);
    }
  );
});

/* All fee details route */
router.post("/enrolledsubjects", (req, res) => {
  EnrolledSubject.find({ StudentID: req.body.id }).then((feeaid) => {
    if (!feeaid) {
      res.status(404).json({ Message: "Record not found!" });
    }
    res.json(feeaid);
  });
});

/* All fee details route */
router.post("/schedule", (req, res) => {
  console.log(req.body);
  Schedule.find({
    Department: req.body.Department,
    Class: req.body.Class,
  }).then((feeaid) => {
    if (!feeaid) {
      res.status(404).json({ Message: "Record not found!" });
    }
    res.json(feeaid);
  });
});

/* Enroll Subject route */
router.post("/enrollsubject", (req, res) => {
  console.log(req.body);
  EnrolledSubject.findOne({
    StudentID: req.body.StudentID,
    Code: req.body.Code,
  }).then((student) => {
    if (student) {
      return res.status(400).json({ ID: "Erollment already exists." });
    } else {
      const newStudent = new EnrolledSubject({
        Name: req.body.Name,
        Code: req.body.Code,
        Class: req.body.Class,
        Department: req.body.Department,
        StudentID: req.body.StudentID,
        Faculty: req.body.Faculty,
      });
      newStudent
        .save()
        .then((student) => res.json(student))
        .catch((err) => console.log(err));
    }
  });
});

/* Pay Fee = route */
router.post("/payfee", (req, res) => {
  console.log(req.body);
  FeeDiscount.findOne({
    StudentID: req.body.StudentID,
  }).then((student) => {
    var aid = 0;
    if (student) {
      aid = (parseInt(student.Discount) * parseInt(req.body.TotalFee)) / 100;
    } else {
      aid = 0;
    }
    const newStudent = new FeeAid({
      StudentID: req.body.StudentID,
      Name: req.body.Name,
      Class: req.body.Class,
      Department: req.body.Department,
      TotalFee: req.body.TotalFee,
      Paid: req.body.Paid,
      Aid: aid,
      Status: parseInt(req.body.Paid) - parseInt(req.body.TotalFee) - aid,
      Date: Date(),
      Month: req.body.Month,
    });
    newStudent
      .save()
      .then((student) => res.json(student))
      .catch((err) => console.log(err));
  });
});

/* All student details route */
router.post("/allstudents", (req, res) => {
  Student.find({}).then((Student) => {
    if (!Student) {
      res.status(404).json({ Message: "Record not found!" });
    }
    res.json(Student);
  });
});

/* All student details route */
router.post("/feehistory", (req, res) => {
  FeeAid.find({ StudentID: req.body.ID }).then((Student) => {
    if (!Student) {
      res.status(404).json({ Message: "Record not found!" });
    }
    res.json(Student);
  });
});

/* Delete student route */
router.post("/delstudent", (req, res) => {
  console.log(req.body.id);
  Student.remove({ _id: req.body.id }, function (err, obj) {
    if (err) res.json({ Message: err });
    res.json({ Message: obj });
  });
});

/* Update student route */
router.post("/updatestudent", (req, res) => {
  console.log(req.body);
  Student.updateOne(
    { id: req.body._id },
    {
      Name: req.body.Name,
      FatherName: req.body.FatherName,
      Address: req.body.Address,
      Phone: req.body.Phone,
      DOB: req.body.DOB,
      Email: req.body.Email,
      Password: req.body.Password,
      Department: req.body.Department,
      Gender: req.body.Gender,
      EnrollDate: req.body.EnrollDate,
    },
    function (err, r) {
      if (err) {
        res.json({ Message: "Student not found." });
      } else res.json({ Message: "Student updated successfully" });
    }
  );
});

/* Client login route */
router.post("/adminlogin", (req, res) => {
  Company.findOne({ Email: req.body.Email }).then((company) => {
    if (!company) {
      res.status(404).json({ Message: "User not found!" });
    }
    console.log(company.Password);
    console.log(req.body.Password);

    if (company.Password === req.body.Password) {
      res.json({
        success: true,
        token: company.id,
      });
    } else {
      res.status(400).json({ keyincorrect: "Incorrect correct password" });
    }
  });
});

module.exports = router;
