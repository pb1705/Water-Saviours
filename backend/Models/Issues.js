const mongoose =require('mongoose');
const issuesSchema = new mongoose.Schema({
    serialNumber:Number,
    village:String,
    latitude:String,
    longitutde:String,
    issue:String,
    date:String,
    time:String,
    raisedToGram:Boolean,
    raisedToGoverment:Boolean,

    
})

const issues = mongoose.model('issues',issuesSchema);
module.exports =  issues