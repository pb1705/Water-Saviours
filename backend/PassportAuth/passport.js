require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../Models/User');
const TwitterStrategy =require('passport-twitter').Strategy;
// const 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    // passReqToCallback:true
  },
  async function(accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        
        const user = await User.findOne({username:profile.emails[0].value});
        if(user){
          // console.log(profile.emails[0].value);
          cb(null,user);
        }
        else{
          const newUser = new User({
            username:profile.emails[0].value,
            firstname:profile.name.givenName,
            lastname:profile.name.familyName,
          })
          // console.log(newUser);
          const response =await newUser.save();
          cb(null,response);
        }
        
  }
));
