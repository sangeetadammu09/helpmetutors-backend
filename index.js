const {dbConn }= require("./config/db");
const express = require('express');
//const connection = require('./config/mysqldb')
const cors = require('cors');
const router = express.Router();
const port = process.env.PORT || 3000;
var app = express();

//routes
var contactRoute = require ('./routes/contactRoute');
const mailRoute = require('./routes/mailRoute')
const parentRoute = require('./routes/parentRoute')
const teacherRoute = require('./routes/teacherRoute')
const adminRoute = require('./routes/adminRoute')

//swagger
//const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require("./swagger.json")

//middlewares
app.use('/api-docs/helpmetutors',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", parameterLimit: 500000000, extended:true }));
app.use(cors({origin:'*',credentials:true}));
app.use('/mail', mailRoute);
app.use('/contact', contactRoute);
app.use('/parent',parentRoute)
app.use('/teacher',teacherRoute)
app.use('/admin',adminRoute)


//connection to db

dbConn();

//connection to server
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
  //   connection.connect(function(err){
  //     if(err) throw err;
  //     console.log('Database connected!');
  // })
});
