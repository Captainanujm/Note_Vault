import mongoose from "mongoose";
import {Router} from "express";
import User from "../models/User";
import { sendOtpEmail } from "../utils/mailer";
import jwt from "jsonwebtoken";
const router = Router();
router.post("/get-otp",async(req,res)=>{
    const {email,dob,name}=req.body;
    if(!email){
        return res.status(400).json({message:"Email is required!"});
    }
    const user=await User.findOne({email});
    const otp=Math.floor(100000+Math.random()*900000).toString();
    const otpExpiry=new Date(Date.now()+10*60*1000);
    if(user){
        user.otp=otp;
        user.otpExpiry=otpExpiry;
        await user.save();
    }else{
        if(!name||!dob){
            return res.status(400).json({message:"Email does not exist. Sign up first"});
        }
        const newUser=new User({email,name,dob,otp,otpExpiry});
        await newUser.save();
    }
    await sendOtpEmail(email,otp).then(() => {
        res.status(200).json({ message: "OTP sent to email" });
      }).catch((error) => {
        console.error("Error sending OTP email:", error);
        res.status(500).json({ message: "Error sending OTP email" });
      });


})
router.post("/verify-otp",async(req,res)=>{
    const {email,otp}=req.body;
    if(!email || !otp||email==""){
        return res.status(400).json({message:"Email and otp is required"});
    }
    const user=await User.findOne({email});
    if(!user||user.otp!=otp||!user.otpExpiry||user.otpExpiry.getTime()<Date.now()){
        return res.status(400).json({message:"Invalid or expired OTP"});
    }else{
        user.otp=undefined;
        user.otpExpiry=undefined;
        await user.save();
        const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
        return res.status(200).json({token,message:"OTP verified successfully"});
    }
})
export default router;
