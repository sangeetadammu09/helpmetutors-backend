const Joi = require('joi');
const TeacherProfile = require('../models/teacherprofileModel');


exports.teachercreateprofile = async(req,res)=>{
    const schema = Joi.object({
        tname: Joi.string().required(),
        temail: Joi.string().email().required(),
        contact: Joi.string().required(),
        location: Joi.string().required(),
        about: Joi.string().required(),
        teachingexp: Joi.string().required(),
        qualification: Joi.string().required(),
        modeofteaching: Joi.string().required(),
        timing: Joi.string().required(),
        charge: Joi.string().required(),
        image:  Joi.string().required(),
        uploadresume: Joi.string().required(),
        idproof: Joi.string().required(),
    })
       try{
        const teacherprofile = await schema.validateAsync(req.body);
        await  TeacherProfile.create(req.body, (err,data)=>{
             if(err)throw err
              return res.status(200).json({ 'message': 'Teacher profile created successfully', 'newteacher': data });
          })
        

       }catch(err){
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
       }
}

//list of teachers
exports.listofteachers = async(req,res)=>{
    try {
        await TeacherProfile.find((err, data)=>{
            if(err)throw err
            return res.status(200).json({ 'message': 'Teachers Fetched Successfully', 'listofteachers': data });
            
        })
       
    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//get single teacher

exports.singleteacher = async(req,res)=>{
   // console.log(req.params.id)
    try {
        await TeacherProfile.findById(req.params.id,(err, data)=>{
            if(err)throw err
            return res.status(200).json({ 'message': `Teacher with ${req.params.id} fetched successfully`, 'singleteacher': data });
            
        })
       
    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//update single teacher by teacher id

exports.updateteacher = async (req,res)=>{
    try{
        await TeacherProfile.findByIdAndUpdate(req.params.id,{
            $set:{
                tname: req.body.tname,
                temail:req.body.temail,
                password:req.body.password,
                cpass:req.body.cpass,
                tname: req.body.tname,
                temail: req.bosy.temail,
                contact: req.body.contact,
                location: req.body.location,
                about: req.body.about,
                teachingexp: req.body.teachingexp,
                qualification: req.body.qualification,
                modeofteaching: req.body.modeofteaching,
                timing: req.body.timing,
                charge: req.body.charge,
                image:  req.body.image,
                uploadresume: req.body,uploadresume,
                idproof: req.body.idproof,
            }
        })
        return res.status(200).json({ 'message': 'Teacher updated successfully', 'updatedteacher':req.body})

    }catch (err) {
        console.log(err,'error')
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//delete single teacher
exports.deleteteacher = async(req,res)=>{
    try{
        await TeacherProfile.findByIdAndDelete(req.params.id,(err,data)=>{
            if(err)throw err
            return res.status(200).json({'message':'Teacher deleted successfully', 'deletedteacher':data})
        })

    }catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}