import mongoose from "mongoose";
import {Router} from "express";
import User from "../models/User";
import { sendOtpEmail } from "../utils/mailer";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
router.post("/google", async (req, res) => {
    try {
        // Handle both 'token' and 'credential' for flexibility
        const { token, credential } = req.body;
        const googleToken = token || credential;

        if (!googleToken) {
            return res.status(400).json({ error: "Google token is required" });
        }

        console.log("Attempting to verify Google token...");

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(401).json({ error: "Invalid Google token" });
        }

        const { email, name, picture } = payload as { 
            email?: string; 
            name?: string; 
            picture?: string; 
        };

        if (!email || !name) {
            return res.status(401).json({ error: "Google account missing required info" });
        }

        console.log(`Google auth successful for: ${email}`);

        // Find or create user
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ 
                email, 
                name, 
            });
            console.log(`Created new user: ${email}`);
        } else {
            console.log(`Found existing user: ${email}`);
        }

        // Issue your JWT
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const appToken = jwt.sign(
            { id: user._id, email: user.email },
            jwtSecret,
            { expiresIn: "7d" }
        );

        res.json({ 
            token: appToken, 
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            }
        });

    } catch (err) {
        console.error("Google auth error:", err);
        res.status(401).json({ 
            error: "Invalid Google token",
            details: process.env.NODE_ENV === 'development' && err instanceof Error ? err.message : undefined
        });
    }
});
router.post("/verify-otp",async(req,res)=>{
    const {email,otp,keepLoggedIn}=req.body;
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
     { expiresIn: keepLoggedIn ? "30d" : "7d" }
  );
        return res.status(200).json({token,message:"OTP verified successfully"});
    }
})
export default router;
