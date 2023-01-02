const mongoose = require('mongoose');
const teacherprofileSchema = mongoose.Schema({
    tname : {type:String, required:true},
    temail: {type:String, required:true},
    contact:{type:String, required:true},
    location:{type:String, required:true},
    qualification:{type:String, required:true},
    teachingexp:{type:String, required:true},
    about:{type:String, required:true},
    modeofteaching:{type:Array, required:true},
    timing:{type:String, required:true},
    vehicle:{type:String, required:true},
    preferredlocation:{type:String},
    charge:{type:String, required:true},
    chargeType:{type:String, required:true},
    subjects:{type:String, required:true},
    image:{type:String},
    document:{type:String},
    creation_dt:{type:Date,default: Date.now}


})


module.exports = mongoose.model('teacherprofile', teacherprofileSchema)