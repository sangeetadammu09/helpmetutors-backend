const express = require ('express');
const teacherloginController = require ('../controllers/teacherloginController');
const teacherprofileController = require ('../controllers/teacherprofileController');
//const Auth = require ('../middleware/Auth')
const router = express.Router();

//teacher login
router.post('/register',teacherloginController.teacherregister);

router.post('/login',teacherloginController.teacherlogin);

//teacher profile
router.post('/form',teacherprofileController.teachercreateprofile);

router.get('/listofteachers',  teacherprofileController.listofteachers);

router.get('/:id', teacherprofileController.singleteacher)

router.put('/update/:id', teacherprofileController.updateteacher);

router.delete('/delete/:id', teacherprofileController.deleteteacher);

module.exports= router;