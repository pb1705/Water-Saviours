const mongoose =require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String,
    position:String,
    location:String
})
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',userSchema);
module.exports =User;