require("dotenv").config();
const router = require("express").Router();
const issues = require("../Models/Issues");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
  // console.log(req.body);
  try {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const alreadyRecieved = await issues.findOne({
      serialNumber: +req.body.serialnumber,
    });
    console.log(alreadyRecieved);
    if (
      alreadyRecieved &&
      alreadyRecieved.date === date &&
      alreadyRecieved.issue === req.body.issue
    ) {
      console.log("alreadyRecieved");
      res.status(200).json({ message: "Grievance Submitted Successfully" });
    } else {
      const newGrievance = new issues({
        serialNumber: +req.body.serialnumber,
        village: req.body.village,
        latitude: req.body.latitude,
        longitutde: req.body.longitutde,
        issue: req.body.issue,
        date: date,
        time: time,
        raisedToGram: false,
        raisedToGoverment: false,
      });

      const response = await newGrievance.save();
      console.log(response);
      if (response) {
        res.status(200).json({ message: "Grievance Submitted Successfully" });
      } else {
        res
          .status(500)
          .json({ message: "We are facing some error! try again later" });
      }
    }
  } catch {
    res
      .status(500)
      .json({ message: "We are facing some error! try again later" });
  }
});
const user = require("./../Models/User");
router.post("/PC", async (req, res) => {
  console.log(req.body);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  try {
    decoded = jwt.verify(req.body.token, process.env.SECRET);
    console.log(decoded);
    if (decoded && decoded.data) {
      const userData = await user.findOne({ username: decoded.data });
      console.log(userData);
      if (userData.position === "PC") {
        const newIssue = new issues({
          serialNumber: +userData.username,
          village: userData.location,
          latitude: req.body.latitude,
          longitutde: req.body.longitutde,
          issue: "Breakdown",
          date: date,
          time: time,
          raisedToGram: false,
          raisedToGoverment: false,
        });
        const response = await newIssue.save();
        console.log(response);
      } else {
        throw new Error("unauthorized!");
      }
      res.status(200).json({ message: "Grievance Submitted Successfully" });
    }
  } catch {
    res.status(500).json({ message: "Not Authorized" });
  }
});
module.exports = router;
