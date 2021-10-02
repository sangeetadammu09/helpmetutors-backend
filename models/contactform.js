const mongoose = require ('mongoose');
var Contact  = mongoose.model('Contact',
{
    name:{type:String},
    email:{type:String},
    phone:{type:Number},
    subject:{type:String},
    message:{type:String}
   
});

module.exports = {Contact};