// dashboardWUC
const router = require("express").Router();
const issues = require("../Models/Issues");
const user = require("../Models/User");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Panchayats = require("../HardCodedData/hardcoded");
const jwt = require("jsonwebtoken");
router.get("/dashboardWUC", async (req, res) => {
  try {
    decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    if (decoded) {
      const userData = await user.findOne({ username: decoded.data });
      if (userData && userData.position === "WUC") {
        const issuesData = await issues.find({ village: userData.location });
        console.log(issuesData);
        res.status(200).json({ issues: issuesData });
      } else {
        throw new Error("Not Authenticated");
      }
    } else {
      throw new Error("Not Authenticated");
    }
  } catch {
    res.status(200).json({ message: "Not Authorized" });
  }
});
router.post("/raisetoGram", async (req, res) => {
  console.log("ran");
  console.log(req.body);
  try {
    const response = await issues.updateOne(
      { _id: req.body._id },
      { raisedToGram: true }
    );
    console.log(response);
    res.status(200).json({ message: "Success" });
  } catch {
    res.status(501).json({ message: "Failed" });
  }
});
router.post("/raisetoGov", async (req, res) => {
  console.log("ran");
  console.log(req.body);
  try {
    const response = await issues.updateOne(
      { _id: req.body._id },
      { raisedToGoverment: true }
    );
    console.log(response);
    res.status(200).json({ message: "Success" });
  } catch {
    res.status(501).json({ message: "Failed" });
  }
});
router.get("/dashboardGram", async (req, res) => {
  try {
    decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    if (decoded) {
      const userData = await user.findOne({ username: decoded.data });
      if (userData && userData.position === "Gram") {
        console.log(userData.location);
        const issuesData = await issues
          .find({
            village: { $in: Panchayats[userData.location] },
            raisedToGram: true,
          })
          .exec();

        console.log(issuesData);
        res.status(200).json({ issues: issuesData });
      } else {
        throw new Error("Not Authenticated");
      }
    } else {
      throw new Error("Not Authenticated");
    }
  } catch {
    res.status(200).json({ message: "Not Authorized" });
  }
});
router.post("/issuesNGO", async (req, res) => {
  console.log(req.body);
  try {
    const response = await issues.find({
      village: { $in: Panchayats[req.body.gp] },
    });
    console.log(response);
    res.status(200).json({ data: response });
  } catch {
    res
      .status(500)
      .json({ message: "We are facing some errors come back later!" });
  }
});
router.post("/issuesGov", async (req, res) => {
  console.log(req.body);
  try {
    const response = await issues.find({
      raisedToGoverment:true,
    });
    console.log(response);
    res.status(200).json({ data: response });
  } catch {
    res
      .status(500)
      .json({ message: "We are facing some errors come back later!" });
  }
});
const quality = require("../Models/quality");
const { route } = require("./auth");
const { response } = require("express");
router.post("/dashboardWMC", async (req, res) => {
  console.log(req.body);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // res.status(200).json({message:'Success'});
  try {
    // const response =await
    const newQualityData = new quality({
      Iron: req.body.Iron,
      village: req.body.village,
      Calcium: req.body.Calcium,
      Zinc: req.body.Zinc,
      Sodium: req.body.Sodium,
      Chlorine: req.body.Chlorine,
      Magnesium: req.body.Magnesium,
      date: date,
    });
    const response = await newQualityData.save();
    console.log(response);
    res.status(200).json({ message: "Success" });
  } catch {
    res.status(500).json({ message: "Some errors at Internal server!" });
  }
});
router.post("/qualityNGO", async (req, res) => {
  console.log(req.body);
  try {
    const response = await quality.find({
      village: { $in: Panchayats[req.body.gp] },
    });
    console.log(response);
    res.status(200).json({ data: response });
  } catch {
    res.status(500).json({ message: "Some errors at Internal server!" });
  }
});

router.get("/");
module.exports = router;
