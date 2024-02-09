const collection = require('../models/user');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

module.exports.home = (req,res)=>{
    res.render("home_n");
}

module.exports.login_get = (req,res) =>{
    res.render("login");
} 

module.exports.signup_get = (req,res) =>{
    res.render("signup");
}

module.exports.order = (req,res) =>{
    res.render("order");
}

module.exports.secret = (req,res) =>{
    res.render("secret");
}

module.exports.logout = (req,res) =>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}

const creatToken = (id) =>{
    return jwt.sign({id},'Tea venum mamey',{
        expiresIn: 60*60*24
    });
} 

const handleErrors = (err) =>{
    console.log(err.message,err.code);
    let errors = {
        name : '',
        password : ''
    }

    //incorrect name
    if(err.message === 'incorrect name'){
        errors.name = 'that user is not registered';
    }
    
    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'password is incorrect';
    }

    //duplicate error code
    if(err.code === 11000){
        errors.name = "User already exist";
        return errors;
    }

    //validation errors
    if(err.message.includes('REPUBLIC validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

module.exports.signup_post = async (req,res) =>{
    const {name,password} = req.body;

        try{
            const user = await collection.create({name,password});
            const token = creatToken(user._id);
            res.cookie('jwt',token,{maxAge:1000*60*60*24,httpOnly:true});
            res.status(201).json({user : user._id});
        }
        catch(err){
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
}

module.exports.login_post = async (req,res) =>{
    const {name, password} = req.body;

    try {
        const user = await collection.login(name,password);
        const token = creatToken(user._id);
        res.cookie('jwt',token,{maxAge:1000*60*60*24,httpOnly:true});
        res.status(200).json({user:user._id});

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

