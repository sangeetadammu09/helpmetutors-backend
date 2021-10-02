const express = require ('express');
const adminController = require ('../controllers/adminController');
//const Auth = require ('../middleware/Auth')
const router = express.Router();

router.post('/register',adminController.adminregister);

router.post('/login',adminController.adminlogin);


module.exports= router;