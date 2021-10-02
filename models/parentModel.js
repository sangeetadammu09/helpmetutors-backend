const mongoose = require('mongoose');
const parentSchema = mongoose.Schema({
    pname : {type:String, required:true},
    pemail: {type:String, required:true},
    password:{type:String, required:true},
    cpass:{type:String, required:true},
    // contact:{type:String, required:true},
    // location:{type:String, required:true},
    // lookingfor:{type:String, required:true},
    // grade:{type:String, required:true},
    // subjects:{type:String, required:true},
    // modeofteaching:{type:String, required:true},
    // budget:{type:String, required:true},
    // budget1:{type:String, required:true},
    // document:{type:String},
    // idproof:{type:String},
    creation_dt:{type:Date,default: Date.now}
})


module.exports = mongoose.model('parentlogin', parentSchema)