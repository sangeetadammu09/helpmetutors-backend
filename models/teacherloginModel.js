const mongoose = require('mongoose');
const teacherSchema = mongoose.Schema({
    tname : {type:String, required:true},
    temail: {type:String, required:true},
    password:{type:String, required:true},
    cpass:{type:String, required:true},
    creation_dt:{type:Date,default: Date.now}
})


module.exports = mongoose.model('teacherlogin', teacherSchema)
