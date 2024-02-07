const express=require("express");
const pasth=require("path");
const bcrypt=require("bcrypt");
const collection=require('./config');

const app=express();

//CONVERTING DATA INTO JSON FORMat
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.set('view engine','ejs');

//adding css file here
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render("login");
})  

app.get('/signup',(req,res)=>{
    res.render("signup",{vari:""});
})
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