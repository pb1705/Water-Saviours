const mongoose =require('mongoose');
const qualitySchema = new mongoose.Schema({
    Iron:Number,
    village:String,
    Calcium:Number,
    Zinc:Number,
    Sodium:Number,
    Chlorine:Number,
    Magnesium:Number,
    date:String
    

    
})

const quality = mongoose.model('quality',qualitySchema);
module.exports =quality;