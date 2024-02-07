
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
       // mongoose.connect("mongodb://0.0.0.0:27017/BARATH") 
        // mongoose.connect("mongodb+srv://barath:987654321@cluster0.wagqwmq.mongodb.net/?retryWrites=true&w=majority")
       mongoose.connect("mongodb+srv://demo:demo@cluster0.nuthidp.mongodb.net/tea")
        // mongoose.connect("mongodb+srv://barath:987654321@cluster0.wagqwmq.mongodb.net/");
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}
connectDB();

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
    const saltrounds=10;
    this.password= await bcrypt.hash(this.password,saltrounds);
    
    console.log('user is going to be save',this);
    next();
})

// collection part
const collection = new mongoose.model("REPUBLIC", Loginschema);
module.exports = collection;

