import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const sendOtpEmail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: `"Note App" <${process.env.EMAIL}>`,
    to,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. Valid for 5 minutes.`,
  });
};