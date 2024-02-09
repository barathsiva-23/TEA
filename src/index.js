const express=require("express");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const { requireAuth, checkuser } = require("../middlewares/authmiddleware");

const authroutes = require('../routes/authRoutes');

require('../database/connection');

const app=express();

//CONVERTING DATA INTO JSON FORMat
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.set('view engine','ejs');

//adding css file here
app.use(express.static("public"));
app.use(authroutes);



//setting and getting cookies example 


// app.get('/set-cookies',(req,res)=>{
//     // res.setHeader("Set-Cookie","newUser=true");
//     res.cookie('newUser',false);
//     res.cookie('isemployee',true,{maxAge: 60 * 60 * 24,httpOnly:true});


//     res.send("you got the cookies");
// })

// app.get('/read-cookies',(req,res)=>{
//     const cookies = req.cookies;
//     console.log(cookies);
//     res.json(cookies);
// })


const port=3000;
app.listen(port,()=>{
    console.log(`server is running on port :${port}`);
})