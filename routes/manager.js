const express = require("express");
const router = express.Router();
const Manager = require("../models/manager");
const CurrentJob = require("../models/CurrentJobs");

/* Manager login route */
router.post("/clientlogin", (req, res) => {
  Manager.findOne({ Email: req.body.Email }).then((manager) => {
    if (!manager) {
      return res.status(404).json({ Message: "Manager not found!" });
    }
    if (manager.Password === req.body.Password) {
      res.json({
        success: true,
        token: "Bearer " + admin.id,
      });
    } else {
      return res
        .status(400)
        .json({ keyincorrect: "Incorrect correct password" });
    }
  });
});

/* Jobs requests */
router.post("/jobsrequestslist", (req, res) => {
  JobRequest.find({ Concern: "Manager" }).then((request) => {
    if (!request) {
      return res.status(404).json({ Message: "Requests not found!" });
    }
    res.json(request);
  });
});

/* Assign job */
router.post("/assignjob", (req, res) => {
  const newCurrentJob = new CurrentJob({
    JobID: req.body.JobID,
    JobTitle: req.body.JobTitle,
    Staff: req.body.Stafflis,
    clientID: req.body.clientID,
    clientName: req.body.clientName,
    CompanyName: req.body.CompanyName,
    Days: req.body.Days,
    CheckIn: req.body.CheckIn,
    CheckOut: req.body.CheckOut,
  });
  newCurrentJob
    .save()
    .then((job) => res.json(job))
    .catch((err) => console.log(err));
});

/* Jobs requests */
router.post("/stafflist", (req, res) => {
  Staff.find().then((staff) => {
    if (!staff) {
      return res.status(404).json({ Message: "Staff not found!" });
    }
    res.json(staff);
  });
});

/* Payment to staff */
router.post("/payment", (req, res) => {
  const newPayment = new Payment({
    JobID: req.body.JobID,
    JobName: req.body.JobName,
    Amount: req.body.Amount,
    PaymentDate: req.body.PaymentDate,
    StaffID: req.body.StaffID,
    StaffName: req.body.StaffName,
    Concern: "Staff",
    CardNumber: req.body.CardNumber,
    CVV: req.body.CVV,
    Date: Date(),
  });
  newPayment
    .save()
    .then((payment) => res.json(payment))
    .catch((err) => console.log(err));
});

/* Jobs requests */
router.post("/recievedlist", (req, res) => {
  Payment.find({ Concern: "Manager" }).then((payment) => {
    if (!payment) {
      return res.status(404).json({ Message: "Payment not found!" });
    }
    res.json(payment);
  });
});
module.exports = router;
