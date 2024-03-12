//model
const User =require("../models/user-moddles");
const bcrypt =require("bcrypt");

const login = async(req,res)=>{
    try {
        console.log("backend login");
        const {email,password}=req.body;
        const userExist= await User.findOne({email});
        if(!userExist){
            return res.status(400).json({msg:"Invalid Credintials"});
        }
        const user =await userExist.passwordMatch(password);
        if(user){
            res.status(200).json({
                msg:"Login Successfull",
                token:await userExist.generateToken(),
                userId:userExist._id.toString(),
            });            
        }else{
            res.status(401).json({msg:"Invalid email or password"});
        }
    } catch (error) {
        res.status(500).send({msg:"Internal server error"})
    }
};
module.exports={login};