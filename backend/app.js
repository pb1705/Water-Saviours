require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const authRouter =require('./Routes/auth');
const session = require('express-session');
const passport =require('passport')
const cors = require('cors');
const cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser')
const User =require('./Models/User')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser("Ilikedkbuthedoesntcare!"))
app.use(
  session({
    secret: "Ilikedkbuthedoesntcare!",
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:60*60*1000*24}
  })
);


const grievanceRoute =require('./Routes/grievance');
const dashBoardRoute =require('./Routes/dashboard');
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use(
  cors({
    origin: ["http://localhost:3000","http://127.0.0.1:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const jwt = require("jsonwebtoken");
mongoose.connect("mongodb+srv://prranavbabbar2317:cfg2023@napschat.bh6yvid.mongodb.net/?retryWrites=true&w=majority").then(() => {
  const User = require("./Models/User");
  app.use('/auth',authRouter);
  app.get("/logout", (req, res) => {
    console.log('ran');
    req.logout((err) => {
      if (err) {
        return;
      }
      req.session.destroy((err) => {
        if (!err) {
          res
            .status(200)
            .clearCookie("connect.sid", { path: "/" })
            .redirect("/");
        } else {
          console.log(err);
        }
      });
    });
  });
  app.use('/grievance',grievanceRoute);
  app.use('/data',dashBoardRoute);
  app.listen(4000, () => {
    console.log("Server listening on port 4000");
  });
});
