const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();
const bodyParser = require("body-parser");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const session = require("express-session");
var cookieParser = require("cookie-parser");

const localStrategy = require("passport-local").Strategy;
router.get("/user", async (req, res) => {
  // console.log(req.headers.authorization);
  try {
    decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    // console.log(decoded)
    const user = await User.findOne({ username: decoded.data });
    if (!user) {
      throw new Error("Unauthorized!");
    }
    res.status(200).json({ user: user });
  } catch {
    console.log("ran");
    res.status(401).json({ message: "Unauthorized!" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(401).json({ message: "No such user exists" });
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == false) {
          res.status(401).json({ message: "Use valid Credentials" });
        } else {
          const token = jwt.sign(
            {
              data: user.username,
            },
            process.env.SECRET,
            { expiresIn: 60 * 60 * 24 }
          );
          console.log(token);
          res.status(201).json({ token: token });
        }
      });
    }
  } catch {
    console.log("ran");
    res.status(500).json({ message: "internalServerError" });
  }
});
require("../PassportAuth/passport");
const passport = require("passport");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser((user, cb) => {
  cb(null, user.username);
});
passport.deserializeUser(async (username, cb) => {
  try {
    const user = await User.findOne({ username: username });
    const userInformation = {
      username: user.username,
    };
    cb(null, userInformation);
  } catch (err) {
    cb(err, null);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(401).json({ message: "Use valid Credentials" });
    } else {
      bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: hash,
          username: req.body.username,
          position:req.body.position,
          location:req.body.location
        });
        const response = await newUser.save();
        console.log(req.body)
        console.log(response);
        if (response) {
          const token = jwt.sign(
            {
              data: response.username,
            },
            process.env.SECRET,
            { expiresIn: 60 * 60 * 24 }
          );

          res.status(201).json({ token: token });
        } else {
          res.status(500).json({ message: "internalServerError" });
        }
      });
    }
  } catch {
    res.status(500).json({ message: "internalServerError" });
  }
});

router.get("/login/success", async (req, res) => {
  if (req.user) {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: await User.find({ username: req.user.username }),
      });
    }
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://127.0.0.1:3000/login",
  }),
  function (req, res) {
    res.redirect("http://127.0.0.1:3000/");
  }
);

module.exports = router;
