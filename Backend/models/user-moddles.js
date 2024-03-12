const mongoose = require("mongoose");
const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");


const JWT_SECRET_KEY="Vishal";
const userSchema = new mongoose.Schema({
    userid:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
});

//for password hashing

userSchema.pre("save",async function(next){
    const user=this;
    if(!user.isModified("password")){
        next();
    }
    try {
        const saltRound=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(user.password,saltRound);
        user.password=hash_password;
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateToken=async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),  //it does not contains userid
            email:this.email,
            isAdmin:this.isAdmin,
        },
        JWT_SECRET_KEY,
        {
            expiresIn:"30d",
        })
    } catch (error) {
        console.error(error);
    }
}
userSchema.methods.passwordMatch =async function(password){
    return bcrypt.compare(password,this.password);
};
const User = new mongoose.model("User",userSchema);
module.exports=User;