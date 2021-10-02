const bcrypt = require ('bcryptjs');
const Joi = require('joi');
const Admin = require('../models/adminModel');
const config = require ('config');
const jwt = require ('jsonwebtoken');
//const { json } = require('express');

exports.adminregister = async(req,res)=> {
    try{
         const schema = Joi.object({
             aname: Joi.string().required(),
             aemail: Joi.string().email().required(),
             password: Joi.string().required(),
             cpass: Joi.string().required(),
             isActive :Joi.string()
         })
         const adminfields = await schema.validateAsync(req.body);
         const salt = await bcrypt.genSalt(10);
         adminfields.password = await bcrypt.hash (adminfields.password, salt);

         try{
            let admin= await Admin.findOne({aemail:adminfields.aemail})
            if(!admin){
                admin = new Admin(adminfields);
                await admin.save();
                return res.status(200).json({
                    message: "Admin registered successfully",
                    regadmin: admin,
                    status: 'success'

                })
            }else {
                return res.status(400).json({
                  message: "Admin Already exists",
                  status : "failed"
                })
            }
         }catch(err){
            return res.status(500).json({
                message: "something went wrong",
                error: err.message,
              })

         }
    }catch(err){
        return res.status(500).json({
            message: "Validation problem occured",
            error: err.message,
          })
    }
}


exports.adminlogin= async(req,res)=> {
  
    try{
        const schema = Joi.object({
          aemail: Joi.required(),
          password: Joi.required()
        })

        const adminFields = await schema.validateAsync(req.body);
        let admin = await Admin.findOne({aemail:adminFields.aemail});
        if(admin){
            const isMatch = await bcrypt.compare(adminFields.password, admin.password)
        
        if(isMatch){
            const payload = {
                admin: {
                    id :admin._id
                }
            }
            jwt.sign(payload, config.get('secretKey'), (err, token) => {
                if (err)
                    throw err;
                const loggedadmin = { adminid: admin.id,adminname: admin.aname, adminemail: admin.email };

                return res.status(200).json({
                    message: "Logged In succesfully",
                    admin: loggedadmin,
                    token: token
                });

            })
            
        }else{
            return res.status (401).json({
                message: "wrong username/password",
                status: "failed"
            })
        }

    }else{
        return res.status (401).json({
            message: "wrong username/password",
            status: "failed"
        })
    }
    
    
}catch(err){
    return res.status (400).json({
        message: "Validation error",
        error: err.message
    })
}
}