// models/Note.ts
import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface INote extends Document {
  user: IUser["_id"];
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<INote>("Note", NoteSchema);
