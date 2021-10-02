const {dbConn }= require("./config/db");
const express = require('express');
const cors = require('cors');
const router = express.Router();
const port = process.env.PORT || 3000;

//routes
var contactController = require ('./controllers/contactControllers');
const  authentication = require('./routes/sendmail')
const parentRoute = require('./routes/parentRoute')
const teacherRoute = require('./routes/teacherRoute')
const adminRoute = require('./routes/adminRoute')

//middlewares
var app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", parameterLimit: 500000000, extended:true }));
app.use(cors({
    origin:'*',
      credentials:true
    }));
app.use('/authentication', authentication);
app.use('/contact', contactController)
app.use('/parent',parentRoute)
app.use('/teacher',teacherRoute)
app.use('/admin',adminRoute)
// let filerouter = require('./routes/testRoute');
// app.use(express.static('resources'));
// app.use('/test', filerouter);

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
       cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
  });   
   
const upload = multer({storage: storage, dest: 'upload'});
app.post("/upload",upload.single('upload'),async(req,res)=>{
  res.send("file upload successful")
})



app.get("/",(req,res)=>{
  res.send("hello i am from helpmetutors server folder")
})

//connection to server
dbConn();
const server = app.listen(port,()=>{
    console.log(`server started at port ${port}`)
});
