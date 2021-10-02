const config = require ("config");
const mongoose = require ("mongoose");
//console.log(config.get('url'));
exports.dbConn=async()=>{
    try{
        await mongoose.connect(config.get('url'),{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false},()=>{
            console.log('Database Connected Successfully');
            
        })

    }catch(err){
              console.log(err.message);
    }
}