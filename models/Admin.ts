import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  password: string;
  role: "super" | "moderator";
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["super", "moderator"], default: "moderator" },
});

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
