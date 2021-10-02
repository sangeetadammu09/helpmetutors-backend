const Joi = require('joi');
const ParentProfile = require('../models/parentprofileModel');


exports.parentcreateprofile = async(req,res)=>{
    const schema = Joi.object({
        pname: Joi.string().required(),
        pemail: Joi.string().email().required(),
        contact: Joi.string().required(),
        location: Joi.string().required(),
        lookingfor: Joi.string().required(),
        grade: Joi.string().required(),
        subjects: Joi.string().required(),
        details: Joi.string().required(),
        modeofteaching: Joi.string().required(),
        gender: Joi.string().required(),
        budget: Joi.string().required(),
        budgettype: Joi.string().required(),
        document: Joi.string(),
        idproof: Joi.string().required()
    })
       try{
        const parentprofile = await schema.validateAsync(req.body);
        await  ParentProfile.create(req.body, (err,data)=>{
             if(err)throw err
              return res.status(200).json({ 'message': 'Parent profile created successfully', 'newparent': data });
          })
        

       }catch(err){
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
       }
}

//list of parents
exports.listofparents = async(req,res)=>{
    try {
        await ParentProfile.find((err, data)=>{
            if(err)throw err
            return res.status(200).json({ 'message': 'Parents Fetched Successfully', 'listofparents': data });
            
        })
       
    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//get single parent

exports.singleparent = async(req,res)=>{
   // console.log(req.params.id)
    try {
        await ParentProfile.findById(req.params.id,(err, data)=>{
            if(err)throw err
            return res.status(200).json({ 'message': `Parent with ${req.params.id} fetched successfully`, 'singleparent': data });
            
        })
       
    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//update single parent by parent id

exports.updateparent = async (req,res)=>{
    try{
        await ParentProfile.findByIdAndUpdate(req.params.id,{
            $set:{
                pname: req.body.pname,
                pemail: req.body.pemail ,
                contact: req.body.contact ,
                location: req.body.location ,
                lookingfor: req.body.lookingfor,
                grade: req.body.grade,
                subjects: req.body.subjects,
                details: req.body.details,
                modeofteaching: req.body.modeofteaching,
                gender: req.body.gender ,
                budget: req.body.budget,
                budgettype: req.body.budgettype,
                document:req.body.document ,
                idproof:req.body.idproof ,
            }
        })
        return res.status(200).json({ 'message': 'parent updated successfully', 'updatedparent':req.body})

    }catch (err) {
        console.log(err,'error')
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//delete single parent
exports.deleteparent = async(req,res)=>{
    try{
        await ParentProfile.findByIdAndDelete(req.params.id,(err,data)=>{
            if(err)throw err
            return res.status(200).json({'message':'parent deleted successfully', 'deletedparent':data})
        })

    }catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}