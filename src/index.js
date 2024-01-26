const express=require("express");
const pasth=require("path");
const crypt=require("bcrypt");
const collection=require('./config');

const app=express();

app.set('view engine','ejs');

//adding css file here
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render("login");
})

app.get('/signup',(req,res)=>{
    res.render("signup");
})


const port=3000;
app.listen(port,()=>{
    console.log(`server is running on port :${port}`);
})