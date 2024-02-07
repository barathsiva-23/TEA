const express=require("express");
const path=require("path");
const bcrypt=require("bcrypt");
const collection=require('./config');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

const app=express();

//CONVERTING DATA INTO JSON FORMat
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set('view engine','ejs');

//adding css file here
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render("login");
})  

app.get('/signup',(req,res)=>{
    res.render("signup",{vari:""});
})

const creatToken = (id) =>{
    return jwt.sign({id},'Tea venum mamey',{
        expiresIn: 1000*60*60*24
    });
}

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


///REGISTER THE USER
app.post("/signup",async(req,res)=>{
         const data={
            name:req.body.username,
            password:req.body.password
         }


//CHECKING IF ALREADY EXISTS
const existinguser=await collection.findOne({name:data.name})


//hashing the password
const saltrounds=10;
const hashpassword= await bcrypt.hash(data.password,saltrounds);
data.password=hashpassword;

if(existinguser){
    res.render("signup",{vari:"Appadi oruthan already irukan da en mairu"});
}
else{
const userdata=await collection.insertMany(data);
const token = creatToken(userdata._id);
res.cookie('jwt',token,{maxAge:1000*60*60*24,httpOnly:true});
res.status(201);
res.render("back");
console.log(userdata);
}
});

//REGISTERING COMPLETED;


//login code //
app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.username});
        if(!check){
            res.send("APPADI ORU USER YAE ILLADA...POI SIGN UP PANNU POO");
        }

        const ispasswordmatch=await bcrypt.compare(req.body.password,check.password);
        if(ispasswordmatch){
            res.render("home");
        }
        else{
            res.send("PASSWORD THAPPU DA....POI OULUNGA PODU");
        }
    }
    catch{
        res.send("THANGALODA DETAILS THAVARANATHU");
    }
})

const port=3000;
app.listen(port,()=>{
    console.log(`server is running on port :${port}`);
})