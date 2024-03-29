
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        unique : true,
        required: [true,'Please enter the name']
    },
    password: {
        type: String,
        required: [true,'Please enter the password'],
        minlength:[8,'Minimum password length is 8 characters']
    }
});

//firing a fucntion after the data has been saved
Loginschema.post('save',function(doc,next){
    console.log('user has been saved in the database',doc);
    next();
})

//firing a function before the data is saved
Loginschema.pre('save', async function(next){
    //hashing the password
    const salt =await  bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    
    console.log('user is going to be save',this);
    next();
})

//static method to login user
Loginschema.statics.login = async function(name,password){
    const user = await this.findOne({name});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect name');
}

// collection part
const collection = new mongoose.model("REPUBLIC", Loginschema);
module.exports = collection;

