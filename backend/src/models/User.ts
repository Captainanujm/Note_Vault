import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  dob?: Date;
  otp?: string;
  otpExpiry?: Date;
  googleId?: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  dob: { type: Date },  
  otp: String,
  otpExpiry: Date,
  googleId: String,
});

export default mongoose.model<IUser>("User", UserSchema);
