const express = require ('express');
const { isValidObjectId } = require('mongoose');
var router = express.Router();
var {Contact} = require ('../models/contactform')
//localhost:3000/employee

var ObjectId = require('mongoose').Types.ObjectId;

router.get('/',(req,res) => {

    Contact.find((err,docs)=>{
        if(!err){res.send(docs);}
        else {console.log('Error in Retriving Contact:'+ JSON.stringify(err, undefined,2));}

    });
});


router.get('/:id',(req,res) => {

    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send(`No record found with given id:${req.params.id}`);

    Contact.findById(req.params.id,(err,docs)=>{
        if(!err){res.send(docs);}
        else {console.log('Error in Retriving Contact:'+ JSON.stringify(err, undefined,2));}

    });
});

router.post('/',(req,res) => {
    var contact = new Contact ({
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        subject:req.body.subject,
        message:req.body.message,
     

    });
    contact.save((err,docs)=> {
        if(!err){res.send(docs)}
        else {console.log('Error in Saving Contact:'+ JSON.stringify(err, undefined,2));}

    });

});

router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record found with given id:${req.params.id}`);

    var contact = {
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        subject:req.body.subject,
        message:req.body.message,

    };
    Contact.findByIdAndUpdate(req.params.id, {$set:emp},{new:true}, (err,doc) => {
        if(!err){res.send(doc);}
        else {console.log('Error in Updating Contact:'+ JSON.stringify(err, undefined,2));}
    })
    
});

router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record found with given id:${req.params.id}`);

    var contact = {
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        subject:req.body.subject,
        message:req.body.message,

    };
    Contact.findByIdAndUpdate(req.params.id, {$set:emp},{new:true}, (err,doc) => {
        if(!err){res.send(doc);}
        else {console.log('Error in Updating Contact:'+ JSON.stringify(err, undefined,2));}
    });
    
});

router.delete('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record found with given id:${req.params.id}`);

    
    Contact.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){res.send(doc);}
        else {console.log('Error in deleting Contact:'+ JSON.stringify(err, undefined,2));}
    });
    
});





module.exports = router;