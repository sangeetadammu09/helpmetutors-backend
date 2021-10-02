const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    aname : {type:String, required:true},
    aemail: {type:String, required:true},
    password:{type:String, required:true},
    cpass:{type:String, required:true},
    creation_dt:{type:Date,default: Date.now}
})


module.exports = mongoose.model('adminlogin', adminSchema)