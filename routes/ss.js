const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");
const Company = require("../models/company");
const JobRequest = require("../models/jobRequests");
const Payment = require("../models/payment");

/* Admin login route */
router.post("/clientlogin", (req, res) => {
  Admin.findOne({ Email: req.body.Email }).then((admin) => {
    if (!admin) {
      return res.status(404).json({ Message: "Admin not found!" });
    }
    if (admin.Password === req.body.Password) {
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
  JobRequest.find({ Concern: "Admin" }).then((request) => {
    if (!request) {
      return res.status(404).json({ Message: "Requests not found!" });
    }
    res.json(request);
  });
});

/* Reject job */
router.post("/jobsrequestslist", (req, res) => {
  JobRequest.updateOne(
    { id: req.body.jobID },
    { Concern: "Client", Reason: req.body.rejectMessage },
    function (err, res) {
      if (err) {
        return res.json({ Message: "Request not found." });
      } else return res.json({ Message: "Request rejected successfully" });
    }
  );
});

/* Assign job */
router.post("/assignjob", (req, res) => {
  JobRequest.updateOne(
    { id: req.body.jobID },
    { Concern: "Manager" },
    function (err, res) {
      if (err) {
        return res.json({ Message: "Request not found." });
      } else return res.json({ Message: "Request assigned successfully" });
    }
  );
});

/* Companies List */
router.post("/companieslist", (req, res) => {
  Company.find().then((conpany) => {
    if (!conpany) {
      return res.status(404).json({ Message: "Not found.!" });
    }
    res.json(company);
  });
});

/* Update company */
router.post("/updatecompany", (req, res) => {
  Company.updateOne(
    { id: req.body.comapnyID },
    {
      Representative: req.body.Representative,
      Designation: req.body.Designation,
      Address: req.body.Address,
      Phone: req.body.Phone,
      CompanyName: req.body.CompanyName,
    },
    function (err, res) {
      if (err) {
        return res.json({ Message: "Compnay not found." });
      } else return res.json({ Message: "Company updated successfully" });
    }
  );
});

/* Staff List */
router.post("/stafflist", (req, res) => {
  Staff.find().then((staff) => {
    if (!staff) {
      return res.status(404).json({ Message: "Not found.!" });
    }
    res.json(staff);
  });
});

/* Update company */
router.post("/updatestaff", (req, res) => {
  Staff.updateOne(
    { id: req.body.staffID },
    {
      Name: req.body.Name,
      Phone: req.body.Phone,
      Email: req.body.Email,
      Address: req.body.Address,
      Specialisation: req.body.Specialisation,
    },
    function (err, res) {
      if (err) {
        return res.json({ Message: "Staff not found." });
      } else return res.json({ Message: "Staff updated successfully" });
    }
  );
});

/* Timesheet */
router.post("/timesheet", (req, res) => {
  CurrentJob.find().then((job) => {
    if (!job) {
      return res.status(404).json({ Message: "Not found.!" });
    }
    res.json(job);
  });
});

/* Recived payments */
router.post("/recievedpayments", (req, res) => {
  Payment.find({ Concern: "Admin" }).then((payment) => {
    if (!payment) {
      return res.status(404).json({ Message: "Not found.!" });
    }
    res.json(payment);
  });
});

/* Assign payment */
router.post("/assignpayment", (req, res) => {
  Payment.updateOne(
    { id: req.body.paymentID },
    { Concern: "Manager" },
    function (err, res) {
      if (err) {
        return res.json({ Message: "Payment not found." });
      } else return res.json({ Message: "Payment assigned successfully" });
    }
  );
});

module.exports = router;
