
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect("mongodb://0.0.0.0:27017/BARATH") 
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
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("REPUBLIC", Loginschema);
console.log("smdn");
module.exports = collection;

