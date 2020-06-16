const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const FeeAid = require("../models/FeeAid");

/* Add student route */
router.post("/addstudent", (req, res) => {
  Student.findOne({ Email: req.body.Email }).then((student) => {
    if (student) {
      return res.status(400).json({ ID: "Student already exists." });
    } else {
      const newStudent = new Student({
        Name: req.body.Name,
        FatherName: req.body.FatherName,
        Address: req.body.Address,
        Phone: req.body.Phone,
        DOB: req.body.DOB,
        Email: req.body.Email,
        Password: req.body.Password,
        Department: req.body.Department,
        EnrolDate: req.body.EnrolDate,
        Class: req.body.Class,
      });
      newStudent
        .save()
        .then((student) => res.json(student))
        .catch((err) => console.log(err));
    }
  });
});

/* All fee details route */
router.post("/feeaid", (req, res) => {
  FeeAid.find({}).then((feeaid) => {
    if (!feeaid) {
      res.status(404).json({ Message: "Record not found!" });
    }
    res.json(feeaid);
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
