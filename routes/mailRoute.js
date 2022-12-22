
const express = require ('express');
const router = express.Router();
const mailController = require ('../controllers/mailController');


router.post('/contact',mailController.mailContact)
router.post('/parent',mailController.mailParent)
router.post('/teacher',mailController.mailTeacher)


module.exports= router;

