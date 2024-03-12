const mongoose = require("mongoose");

const MONGODB_URI="mongodb+srv://vishalagraharibasti:Agrahari123@cluster0.fwudeea.mongodb.net/mern_admin?retryWrites=true&w=majority";
const connectDB = async() =>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Data Base Connected");
    } catch (error) {
        console.error("Data Base is not connected properly")
        process.exit(1);
    }
}

module.exports=connectDB;