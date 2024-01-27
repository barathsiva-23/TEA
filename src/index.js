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
    res.render("signup");
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
    res.send("USER ALREADY ORUTHAN IRRUKANDA....NEE VERA PODU");
}
else{
const userdata=await collection.insertMany(data);
console.log(userdata);
}
});

//REGISTERING COMPLETED;

const port=3000;
app.listen(port,()=>{
    console.log(`server is running on port :${port}`);
})